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
// 5. Generates a theological overview summary and stores it
// ============================================================

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { chunkDocument } from "../lib/chunker.js";
import { FATHERS } from "../lib/fathers.js";

// Load env vars (when running as a script, not via Next.js)
import { config } from "dotenv";
config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DATA_DIR = path.join(process.cwd(), "data");
const BATCH_SIZE = 20; // embed 20 chunks at a time to stay within rate limits

// ── Embed a batch of texts ────────────────────────────────────
async function embedBatch(texts) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

// ── Generate theological overview for a Father ────────────────
async function generateOverview(father, docTexts) {
  console.log(`  Generating theological overview for ${father.name}...`);
  const sample = docTexts
    .map((t) => t.slice(0, 3000))
    .join("\n\n---\n\n")
    .slice(0, 15000);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 800,
    system: `You are a patristics scholar. Write a 200-300 word theological overview of ${father.name} 
based on the sample texts provided. Cover: their hermeneutical method, key theological commitments, 
historical context, major works, and how their thought developed over time. 
This will be injected into every prompt to give the AI model context before it reads retrieved passages.
Write in third person, densely informative, no preamble.`,
    messages: [
      {
        role: "user",
        content: `Sample texts from ${father.name}'s writings:\n\n${sample}`,
      },
    ],
  });

  return response.content[0].text;
}

// ── Ingest a single father ─────────────────────────────────────
async function ingestFather(fatherId) {
  const father = FATHERS[fatherId];
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

  const allDocTexts = [];
  let totalChunks = 0;

  for (const file of files) {
    const filePath = path.join(fatherDataDir, file);
    const text = fs.readFileSync(filePath, "utf-8");
    allDocTexts.push(text);

    console.log(`  Processing ${file} (${Math.round(text.length / 1000)}k chars)...`);

    const chunks = chunkDocument(text, file);
    console.log(`    → ${chunks.length} chunks`);

    // Process in batches
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const texts = batch.map((c) => c.chunkText);

      // Generate embeddings for this batch
      const embeddings = await embedBatch(texts);

      // Insert into Supabase
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

      // Small delay to respect rate limits
      await new Promise((r) => setTimeout(r, 200));
    }

    totalChunks += chunks.length;
    console.log(`    ✓ Done: ${chunks.length} chunks from ${file}`);
  }

  // Generate and store theological overview
  const overview = await generateOverview(father, allDocTexts);

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
  const targetFather = process.argv[2]; // e.g. node scripts/ingest.js augustine

  if (targetFather) {
    await ingestFather(targetFather);
  } else {
    // Ingest all fathers that have data directories
    const fatherIds = Object.keys(FATHERS).filter((id) =>
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
