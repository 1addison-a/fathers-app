// ============================================================
// Full RAG Retrieval Pipeline
// 1. Multi-query expansion
// 2. Hybrid search (vector + keyword) per query
// 3. Merge + deduplicate
// 4. Cohere re-ranking
// 5. Return top K chunks with parent context
//
// HYBRID AGENT MODE (retrieveAcrossAllFathers):
// Runs retrieval against every Father's corpus simultaneously,
// scores each Father by their top chunk's rerank score,
// filters out Fathers below a relevance threshold,
// and returns only the Fathers who actually have something to say.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RETRIEVAL_TOP_K = parseInt(process.env.RETRIEVAL_TOP_K || "20");
const RERANK_TOP_K = parseInt(process.env.RERANK_TOP_K || "8");

// Fathers whose top rerank score falls below this threshold are excluded
// from the response. Tune this value: higher = stricter filtering.
// 0.3 is a good starting point — lowers it if Fathers are excluded too often.
const RELEVANCE_THRESHOLD = parseFloat(process.env.RELEVANCE_THRESHOLD || "0.3");

// ── Step 1: Multi-query expansion ────────────────────────────
export async function expandQuery(question) {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: `You generate search query variations for a patristic theological retrieval system.
Return ONLY a JSON array of 4 strings — different phrasings of the input question
that would retrieve different but relevant passages from a Church Father's writings.
Vary vocabulary, perspective, and specificity. No preamble, no markdown, no backticks.`,
    messages: [{ role: "user", content: question }],
  });

  try {
    const queries = JSON.parse(response.content[0].text.trim());
    return [question, ...queries].slice(0, 5);
  } catch {
    return [question];
  }
}

// ── Step 2a: Semantic (vector) search ────────────────────────
async function semanticSearch(queryEmbedding, fatherId, topK = RETRIEVAL_TOP_K) {
  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: queryEmbedding,
    father_id_filter: fatherId,
    match_count: topK,
  });
  if (error) { console.error("Semantic search error:", error); return []; }
  return data || [];
}

// ── Step 2b: Keyword (BM25) search ───────────────────────────
async function keywordSearch(queryText, fatherId, topK = RETRIEVAL_TOP_K) {
  const { data, error } = await supabase.rpc("keyword_search_chunks", {
    query_text: queryText,
    father_id_filter: fatherId,
    match_count: topK,
  });
  if (error) { console.error("Keyword search error:", error); return []; }
  return data || [];
}

// ── Step 2c: Embed a single query ─────────────────────────────
async function embedQuery(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// ── Step 3: Merge and deduplicate via reciprocal rank fusion ──
function mergeAndDeduplicate(allResults) {
  const scoreMap = new Map();

  allResults.forEach((results) => {
    results.forEach((chunk, rank) => {
      const rrfScore = 1 / (rank + 60);
      const existing = scoreMap.get(chunk.id);
      if (existing) {
        existing.score += rrfScore;
      } else {
        scoreMap.set(chunk.id, {
          id: chunk.id,
          father_id: chunk.father_id,
          source_doc: chunk.source_doc,
          chunk_text: chunk.chunk_text,
          parent_text: chunk.parent_text,
          score: rrfScore,
        });
      }
    });
  });

  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, RETRIEVAL_TOP_K);
}

// ── Step 4: Cohere re-ranking ─────────────────────────────────
async function rerankChunks(question, candidates, topN = RERANK_TOP_K) {
  if (candidates.length === 0) return [];

  const response = await fetch("https://api.cohere.com/v1/rerank", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "rerank-english-v3.0",
      query: question,
      documents: candidates.map((c) => c.chunk_text),
      top_n: topN,
    }),
  });

  if (!response.ok) {
    console.error("Cohere rerank failed, falling back to original order");
    return candidates.slice(0, topN);
  }

  const data = await response.json();
  return data.results.map((r) => ({
    ...candidates[r.index],
    rerankScore: r.relevance_score,
  }));
}

// ── Retrieve for a single Father ──────────────────────────────
// Used both for single-father mode and as a building block for
// the cross-corpus agent
export async function retrieveContext(question, fatherId, fatherName) {
  try {
    const queries = await expandQuery(question);
    console.log(`[RAG] ${fatherName}: ${queries.length} queries`);

    const allResults = await Promise.all(
      queries.map(async (q) => {
        const [embedding, keywordResults] = await Promise.all([
          embedQuery(q),
          keywordSearch(q, fatherId),
        ]);
        const vectorResults = await semanticSearch(embedding, fatherId);
        return mergeAndDeduplicate([vectorResults, keywordResults]);
      })
    );

    const merged = mergeAndDeduplicate(allResults);
    const reranked = await rerankChunks(question, merged);
    return reranked;
  } catch (error) {
    console.error(`[RAG] retrieveContext error for ${fatherId}:`, error);
    return [];
  }
}

// ── HYBRID AGENT: Retrieve across ALL Fathers ────────────────
// 1. Expand the query once (shared across all Fathers)
// 2. Embed the expanded queries once (shared)
// 3. Run hybrid search against every Father's corpus in parallel
// 4. Re-rank each Father's candidates independently
// 5. Score each Father by their best chunk's rerank score
// 6. Filter out Fathers below RELEVANCE_THRESHOLD
// 7. Return sorted list: [{ fatherId, chunks, topScore }]
export async function retrieveAcrossAllFathers(question, fatherIds) {
  // Step 1 & 2: Expand query and embed all variations once
  const queries = await expandQuery(question);
  console.log(`[AGENT] Expanded to ${queries.length} queries across ${fatherIds.length} Fathers`);

  const embeddings = await Promise.all(queries.map(embedQuery));

  // Step 3: Run hybrid search for each Father in parallel
  const fatherResults = await Promise.all(
    fatherIds.map(async (fatherId) => {
      try {
        // Run all queries against this Father's corpus
        const allResults = await Promise.all(
          queries.map(async (q, i) => {
            const [vectorResults, keywordResults] = await Promise.all([
              semanticSearch(embeddings[i], fatherId),
              keywordSearch(q, fatherId),
            ]);
            return mergeAndDeduplicate([vectorResults, keywordResults]);
          })
        );

        const merged = mergeAndDeduplicate(allResults);
        return { fatherId, candidates: merged };
      } catch (err) {
        console.error(`[AGENT] Search error for ${fatherId}:`, err);
        return { fatherId, candidates: [] };
      }
    })
  );

  // Step 4: Re-rank each Father's candidates against the original question
  // Do this in parallel but rate-limit to avoid Cohere rate limits
  const rerankedResults = await Promise.all(
    fatherResults.map(async ({ fatherId, candidates }) => {
      if (candidates.length === 0) return { fatherId, chunks: [], topScore: 0 };
      const reranked = await rerankChunks(question, candidates, RERANK_TOP_K);
      const topScore = reranked[0]?.rerankScore ?? 0;
      return { fatherId, chunks: reranked, topScore };
    })
  );

  // Step 5 & 6: Filter by relevance threshold and sort by score
  const relevant = rerankedResults
    .filter(({ topScore }) => topScore >= RELEVANCE_THRESHOLD)
    .sort((a, b) => b.topScore - a.topScore);

  console.log(
    `[AGENT] ${relevant.length}/${fatherIds.length} Fathers cleared threshold (${RELEVANCE_THRESHOLD}):`,
    relevant.map(r => `${r.fatherId}(${r.topScore.toFixed(2)})`).join(", ")
  );

  return relevant;
}

// ── Father summary ────────────────────────────────────────────
export async function getFatherSummary(fatherId) {
  const { data } = await supabase
    .from("father_summaries")
    .select("theological_overview, key_works")
    .eq("father_id", fatherId)
    .single();
  return data || null;
}

export async function getAllFatherSummaries(fatherIds) {
  const { data } = await supabase
    .from("father_summaries")
    .select("father_id, theological_overview, key_works")
    .in("father_id", fatherIds);
  const map = {};
  (data || []).forEach(s => { map[s.father_id] = s; });
  return map;
}

// ── Format context for the system prompt ─────────────────────
export function formatContextForPrompt(chunks, fatherSummary) {
  const parts = [];
  if (fatherSummary?.theological_overview) {
    parts.push(`## THEOLOGICAL OVERVIEW\n${fatherSummary.theological_overview}`);
  }
  if (chunks.length > 0) {
    parts.push("## RELEVANT PASSAGES FROM YOUR WRITINGS");
    chunks.forEach((chunk, i) => {
      const text = chunk.parent_text || chunk.chunk_text;
      parts.push(`### Passage ${i + 1} — from "${chunk.source_doc}"\n${text}`);
    });
  }
  return parts.join("\n\n");
}
