// ============================================================
// Ingestion Script
// Run once: node scripts/ingest.js
// Or for a specific father: node scripts/ingest.js augustine
//
// What it does:
// 1. Reads all .txt files from data/<fatherId>/
// 2. Chunks them with overlap
// 3. Generates embeddings (OpenAI text-embedding-3-small)
// 4. Stores chunks + embeddings in Supabase
// 5. Stores a theological overview from fathers.js
// ============================================================

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { chunkDocument } from "../lib/chunker.js";
import { FATHERS, EXTENDED_FATHERS } from "../lib/fathers.js";

import { config } from "dotenv";
config({ path: ".env.local" });

const ALL_FATHERS = { ...FATHERS, ...EXTENDED_FATHERS };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DATA_DIR = path.join(process.cwd(), "data");
const BATCH_SIZE = 20;

// ── Embed a batch of texts ────────────────────────────────────
async function embedBatch(texts) {
  const truncated = texts.map((t) => t.slice(0, 6000));
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: truncated,
  });
  return response.data.map((d) => d.embedding);
}

// ── Ingest a single father ─────────────────────────────────────
async function ingestFather(fatherId) {
  const father = ALL_FATHERS[fatherId];
  if (!father) {
    console.error(`Unknown father: ${fatherId}`);
    return;
  }

  const fatherDataDir = path.join(DATA_DIR, fatherId);
  if (!fs.existsSync(fatherDataDir)) {
    console.log(`No data directory found at ${fatherDataDir} — skipping`);
    return;
  }

  const files = fs
    .readdirSync(fatherDataDir)
    .filter((f) => f.endsWith(".txt") || f.endsWith(".md"));

  if (files.length === 0) {
    console.log(`No .txt or .md files found in ${fatherDataDir} — skipping`);
    return;
  }

  console.log(`\n═══ Ingesting ${father.name} (${files.length} files) ═══`);

  // Delete existing chunks for this father (clean re-ingest)
  const { error: deleteError } = await supabase
    .from("chunks")
    .delete()
    .eq("father_id", fatherId);
  if (deleteError) console.warn("  Warning: could not delete existing chunks:", deleteError.message);

  let totalChunks = 0;

  for (const file of files) {
    const filePath = path.join(fatherDataDir, file);
    const text = fs.readFileSync(filePath, "utf-8");

    console.log(`  Processing ${file} (${Math.round(text.length / 1000)}k chars)...`);

    const chunks = chunkDocument(text, file);
    console.log(`    → ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const texts = batch.map((c) => c.chunkText);

      const embeddings = await embedBatch(texts);

      const rows = batch.map((chunk, j) => ({
        father_id: fatherId,
        source_doc: chunk.sourceDoc,
        chunk_index: chunk.chunkIndex,
        chunk_text: chunk.chunkText,
        parent_text: chunk.parentText,
        embedding: embeddings[j],
      }));

      const { error } = await supabase.from("chunks").insert(rows);
      if (error) {
        console.error(`    ✗ Insert error at batch ${i}:`, error.message);
      } else {
        process.stdout.write(`    ✓ Inserted chunks ${i + 1}–${Math.min(i + BATCH_SIZE, chunks.length)}\r`);
      }

      await new Promise((r) => setTimeout(r, 200));
    }

    totalChunks += chunks.length;
    console.log(`    ✓ Done: ${chunks.length} chunks from ${file}`);
  }

  // Store theological overview from fathers.js (no API call needed)
  const overview = father.defaultOverview || `${father.name} (${father.era}), a ${father.tradition} Father of the Church.`;

  const { error: summaryError } = await supabase
    .from("father_summaries")
    .upsert({
      father_id: fatherId,
      name: father.name,
      era: father.era,
      tradition: father.tradition,
      theological_overview: overview,
      key_works: files.map((f) => f.replace(/\.txt|\.md/, "")),
      updated_at: new Date().toISOString(),
    });

  if (summaryError) {
    console.error("  ✗ Summary insert error:", summaryError.message);
  } else {
    console.log(`  ✓ Theological overview stored`);
  }

  console.log(`\n✓ ${father.name} complete — ${totalChunks} total chunks ingested`);
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const targetFather = process.argv[2];

  if (targetFather) {
    await ingestFather(targetFather);
  } else {
    const fatherIds = Object.keys(ALL_FATHERS).filter((id) =>
      fs.existsSync(path.join(DATA_DIR, id))
    );

    if (fatherIds.length === 0) {
      console.log("No data directories found. Add .txt files to data/<fatherId>/ and run again.");
      return;
    }

    for (const id of fatherIds) {
      await ingestFather(id);
    }
  }

  console.log("\n✓ Ingestion complete");
}

main().catch(console.error);