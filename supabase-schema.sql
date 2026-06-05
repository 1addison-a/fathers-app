-- ============================================================
-- Voices of the Fathers — Supabase Schema
-- Run this in your Supabase SQL editor before ingesting docs
-- ============================================================

-- Enable the pgvector extension
create extension if not exists vector;

-- ── Chunks table ─────────────────────────────────────────────
create table if not exists chunks (
  id          uuid primary key default gen_random_uuid(),
  father_id   text not null,
  source_doc  text not null,
  chunk_index integer not null,
  chunk_text  text not null,
  parent_text text,
  embedding   vector(1536),
  created_at  timestamptz default now()
);

-- ── Father summaries table ───────────────────────────────────
create table if not exists father_summaries (
  father_id             text primary key,
  name                  text not null,
  era                   text not null,
  tradition             text not null,
  theological_overview  text not null,
  key_works             text[],
  updated_at            timestamptz default now()
);

-- ── Enable Row Level Security ─────────────────────────────────
-- This locks down direct table access from the browser.
-- Your Next.js API routes use the service_role key which
-- bypasses RLS entirely, so they are unaffected.
alter table chunks enable row level security;
alter table father_summaries enable row level security;

-- ── RLS Policies ──────────────────────────────────────────────
-- No public read or write access.
-- All access goes through your server-side API routes
-- using the service_role key, which bypasses RLS.
-- If you ever add user auth, add policies here.

-- Explicitly deny all access from anon/authenticated roles
create policy "No public access to chunks"
  on chunks
  for all
  to anon, authenticated
  using (false);

create policy "No public access to father_summaries"
  on father_summaries
  for all
  to anon, authenticated
  using (false);

-- ── Indexes ───────────────────────────────────────────────────
create index if not exists chunks_embedding_idx
  on chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists chunks_fts_idx
  on chunks using gin (to_tsvector('english', chunk_text));

create index if not exists chunks_father_idx
  on chunks (father_id);

-- ── Vector similarity search function ────────────────────────
create or replace function match_chunks(
  query_embedding vector(1536),
  father_id_filter text,
  match_count int default 20
)
returns table (
  id uuid,
  father_id text,
  source_doc text,
  chunk_text text,
  parent_text text,
  similarity float
)
language sql stable
security definer  -- runs as the function owner, bypasses RLS
as $$
  select
    c.id,
    c.father_id,
    c.source_doc,
    c.chunk_text,
    c.parent_text,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  where c.father_id = father_id_filter
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

-- ── Keyword search function ───────────────────────────────────
create or replace function keyword_search_chunks(
  query_text text,
  father_id_filter text,
  match_count int default 20
)
returns table (
  id uuid,
  father_id text,
  source_doc text,
  chunk_text text,
  parent_text text,
  rank float
)
language sql stable
security definer  -- runs as the function owner, bypasses RLS
as $$
  select
    c.id,
    c.father_id,
    c.source_doc,
    c.chunk_text,
    c.parent_text,
    ts_rank(to_tsvector('english', c.chunk_text), plainto_tsquery('english', query_text)) as rank
  from chunks c
  where
    c.father_id = father_id_filter
    and to_tsvector('english', c.chunk_text) @@ plainto_tsquery('english', query_text)
  order by rank desc
  limit match_count;
$$;
