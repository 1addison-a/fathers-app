// ============================================================
// POST /api/chat
//
// Hybrid agent mode — no Father pre-selection required.
//
// Flow:
// 1. Expand query + embed (once, shared)
// 2. Run hybrid search across ALL Father corpora in parallel
// 3. Re-rank each Father's results independently
// 4. Filter out Fathers below relevance threshold
// 5. Generate attributed responses only from relevant Fathers
// 6. Return responses + cross-reference convergence data
// ============================================================

import Anthropic from "@anthropic-ai/sdk";
import { getAllFathers, getFather } from "../../../lib/fathers.js";
import {
  retrieveAcrossAllFathers,
  getAllFatherSummaries,
  formatContextForPrompt,
} from "../../../lib/retrieval.js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { question, conversations } = await req.json();
    // conversations: { fatherId: [{role, content}] } — full history per Father

    if (!question?.trim()) {
      return Response.json({ error: "No question provided" }, { status: 400 });
    }

    const allFathers = getAllFathers();
    const allFatherIds = allFathers.map(f => f.id);

    // ── 1. Route: find which Fathers are relevant ─────────────
    const relevantFathers = await retrieveAcrossAllFathers(question, allFatherIds);

    if (relevantFathers.length === 0) {
      return Response.json({
        results: [],
        noRelevantFathers: true,
        message: "No Father's writings closely matched this question. Try rephrasing or ask about a specific theological topic.",
      });
    }

    // ── 2. Load summaries for all relevant Fathers at once ────
    const summaryMap = await getAllFatherSummaries(relevantFathers.map(r => r.fatherId));

    // ── 3. Generate response from each relevant Father ────────
    const results = await Promise.all(
      relevantFathers.map(async ({ fatherId, chunks, topScore }) => {
        const father = getFather(fatherId);
        const summary = summaryMap[fatherId];
        const contextText = formatContextForPrompt(
          chunks,
          summary || { theological_overview: father.defaultOverview }
        );

        const systemPrompt = `You are ${father.name} (${father.era}), the Church Father from the ${father.tradition} tradition.
Speak in first person as ${father.name} — flowing patristic prose, no bullet points, no numbered lists.
Write as a scholar-bishop: theologically precise, pastorally warm, with the cadence of a homily or epistle.

When drawing from your writings provided below, mark citations inline using [[CITE: document_name, brief description]] immediately after the relevant sentence. Only cite when genuinely drawing from the text.

After your response add exactly:
---CROSSREFS---
A JSON array of scripture references you mentioned, e.g. ["John 1:1", "Romans 5:12"]. If none, write [].

${contextText}`;

        // Build messages with this Father's conversation history
        const history = (conversations?.[fatherId] || []);
        const messages = [...history, { role: "user", content: question }];

        try {
          const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6-20250514",
            max_tokens: 1200,
            system: systemPrompt,
            messages,
          });

          const raw = response.content[0]?.text || "";
          const markerIdx = raw.indexOf("---CROSSREFS---");
          const responseText = markerIdx !== -1 ? raw.slice(0, markerIdx).trim() : raw;
          let crossrefs = [];
          if (markerIdx !== -1) {
            try { crossrefs = JSON.parse(raw.slice(markerIdx + 15).trim()); } catch {}
          }

          return {
            fatherId,
            response: responseText,
            crossrefs,
            topScore,
            hasContext: chunks.length > 0,
            sourceChunks: chunks.map(c => ({
              sourceDoc: c.source_doc,
              rerankScore: c.rerankScore,
            })),
            // Return the updated history so the frontend can store it
            updatedHistory: [
              ...history,
              { role: "user", content: question },
              { role: "assistant", content: responseText },
            ],
          };
        } catch (err) {
          console.error(`[chat] Response error for ${fatherId}:`, err);
          return {
            fatherId, response: "An error occurred retrieving this Father's response.",
            crossrefs: [], topScore, hasContext: false, sourceChunks: [], updatedHistory: history,
          };
        }
      })
    );

    // ── 4. Compute cross-reference convergence ────────────────
    const refMap = {};
    results.forEach(({ fatherId, crossrefs }) => {
      (crossrefs || []).forEach(ref => {
        if (!refMap[ref]) refMap[ref] = [];
        refMap[ref].push(fatherId);
      });
    });
    const sharedRefs = Object.entries(refMap)
      .filter(([, ids]) => ids.length > 1)
      .map(([ref, ids]) => ({ ref, ids }))
      .sort((a, b) => b.ids.length - a.ids.length);

    return Response.json({ results, sharedRefs });
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
