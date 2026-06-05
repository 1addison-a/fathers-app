# Voices of the Fathers

Query Church Fathers through their own writings using full RAG — 
multi-query expansion, hybrid semantic + keyword search, and Cohere re-ranking.

---

## Stack

| Layer | Service | Cost |
|---|---|---|
| Frontend + API routes | Next.js on Vercel | Free |
| Vector database | Supabase (pgvector) | Free tier |
| Embeddings | OpenAI text-embedding-3-small | ~$0.02/1M tokens |
| Re-ranking | Cohere rerank-english-v3.0 | Free tier (1000 calls/mo) |
| LLM | Anthropic Claude Sonnet | ~$3/$15 per 1M in/out tokens |

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd fathers-app
npm install
```

### 2. Create a Supabase project

1. Go to supabase.com → New Project
2. Open the SQL Editor
3. Run the entire contents of `supabase-schema.sql`
4. Copy your project URL and service role key

### 3. Get API keys

- **Anthropic:** console.anthropic.com → API Keys
- **OpenAI:** platform.openai.com → API Keys (used only for embeddings)
- **Cohere:** cohere.com → API Keys (free tier covers ~1000 reranks/month)
- **Supabase:** Project Settings → API

### 4. Configure environment

```bash
cp .env.local.example .env.local
# Fill in all values in .env.local
```

### 5. Add your documents

Put `.txt` files in `data/<fatherId>/`. The father IDs are:
```
data/
  augustine/
    confessions.txt
    city-of-god.txt
  chrysostom/
    homilies-on-matthew.txt
  origen/
    commentary-on-john.txt
  jerome/
    ...
  cyril/
    ...
  ambrose/
    ...
  evagrius/
    ...
```

**Where to get the texts (free):**
- CCEL (ccel.org) — best source, most Fathers in plain text
- Tertullian.org — broad patristic library
- New Advent (newadvent.org/fathers) — copy-paste into .txt files
- Internet Archive — scanned books, needs OCR cleanup

**Tip:** Clean your text files first — remove page numbers, headers, footnotes. 
The cleaner the input, the better the retrieval.

### 6. Run ingestion

```bash
# Ingest all fathers that have data directories
npm run ingest

# Or ingest one father at a time
node scripts/ingest.js augustine
node scripts/ingest.js chrysostom
```

This runs once. Re-run only when you add new documents.

**What ingestion does:**
1. Chunks each document into ~500-word pieces with 100-word overlap
2. Stores each chunk alongside a larger parent chunk for richer context
3. Generates embeddings via OpenAI text-embedding-3-small
4. Stores everything in Supabase
5. Generates a theological overview summary per Father using Claude

**Estimated ingestion cost:**
- Augustine's complete works (~1.5M words) ≈ $0.03 one-time
- All seven Fathers combined ≈ $0.10–0.20 one-time

### 7. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 8. Deploy to Vercel

```bash
# Push to GitHub, then:
# 1. vercel.com → New Project → import your repo
# 2. Add all environment variables from .env.local to Vercel dashboard
# 3. Deploy
```

---

## RAG Pipeline (per query)

```
User question
    ↓
Multi-query expansion     Claude Haiku generates 4 rephrasings
    ↓
Hybrid search             Vector similarity + BM25 keyword search
    ↓                     run in parallel for each rephrasing
Merge + deduplicate       Reciprocal rank fusion across all results
    ↓
Cohere re-ranking         Cross-encoder re-scores top 20 candidates
    ↓
Top 8 chunks              Sent to Claude as context (parent chunks = ~1500 words each)
    ↓
Claude responds           As the Father, with inline citations and scripture refs
```

---

## Adding a New Father

1. Add their entry to `lib/fathers.js`
2. Create `data/<newFatherId>/` and add `.txt` files
3. Run `node scripts/ingest.js <newFatherId>`
4. Add them to `FATHERS_META` in `app/page.jsx`

---

## Cost Estimate (live app with users)

| Usage | Est. monthly cost |
|---|---|
| Personal study (you only) | $1–3 |
| Small group (10–15 users) | $5–15 |
| Active community (50+ users) | Add rate limiting + spend cap |

**Always set a spend cap in console.anthropic.com** — it takes 30 seconds and prevents surprises.
