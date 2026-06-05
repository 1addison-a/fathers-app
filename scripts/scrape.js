// ============================================================
// Patristic Library Scraper
// Downloads all ANF + NPNF volumes from CCEL and organizes
// them into the correct data/<fatherId>/ folders
//
// Run: node scripts/scrape.js
// Or single father: node scripts/scrape.js augustine
// ============================================================

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// ── Volume → Father mapping ───────────────────────────────────
const VOLUMES = [
  // ── Augustine (NPNF Series 1) ──
  { url: "https://www.ccel.org/ccel/schaff/npnf101.txt", father: "augustine", file: "npnf101-confessions-letters.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf102.txt", father: "augustine", file: "npnf102-city-of-god.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf103.txt", father: "augustine", file: "npnf103-trinity-treatises.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf104.txt", father: "augustine", file: "npnf104-anti-manichaean.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf105.txt", father: "augustine", file: "npnf105-anti-pelagian.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf106.txt", father: "augustine", file: "npnf106-sermon-on-mount.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf107.txt", father: "augustine", file: "npnf107-homilies-john.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf108.txt", father: "augustine", file: "npnf108-psalms.txt" },

  // ── Chrysostom (NPNF Series 1) ──
  { url: "https://www.ccel.org/ccel/schaff/npnf109.txt", father: "chrysostom", file: "npnf109-priesthood-homilies.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf110.txt", father: "chrysostom", file: "npnf110-matthew.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf111.txt", father: "chrysostom", file: "npnf111-acts-romans.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf112.txt", father: "chrysostom", file: "npnf112-corinthians.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf113.txt", father: "chrysostom", file: "npnf113-epistles.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf114.txt", father: "chrysostom", file: "npnf114-john-hebrews.txt" },

  // ── Jerome ──
  { url: "https://www.ccel.org/ccel/schaff/npnf203.txt", father: "jerome", file: "npnf203-theodoret-jerome-rufinus.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf206.txt", father: "jerome", file: "npnf206-jerome-letters-works.txt" },

  // ── Ambrose ──
  { url: "https://www.ccel.org/ccel/schaff/npnf210.txt", father: "ambrose", file: "npnf210-ambrose-works-letters.txt" },

  // ── Athanasius ──
  { url: "https://www.ccel.org/ccel/schaff/npnf204.txt", father: "athanasius", file: "npnf204-athanasius-writings.txt" },

  // ── Gregory of Nyssa ──
  { url: "https://www.ccel.org/ccel/schaff/npnf205.txt", father: "gregory_nyssa", file: "npnf205-gregory-nyssa.txt" },

  // ── Basil of Caesarea ──
  { url: "https://www.ccel.org/ccel/schaff/npnf208.txt", father: "basil", file: "npnf208-basil-letters-works.txt" },

  // ── Gregory Nazianzen ──
  { url: "https://www.ccel.org/ccel/schaff/npnf207.txt", father: "gregory_naz", file: "npnf207-cyril-gregory-naz.txt" },

  // ── Origen (ANF) ──
  { url: "https://www.ccel.org/ccel/schaff/anf04.txt", father: "origen", file: "anf04-origen-first-principles.txt" },
  { url: "https://www.ccel.org/ccel/schaff/anf09.txt", father: "origen", file: "anf09-origen-commentaries.txt" },

  // ── Tertullian ──
  { url: "https://www.ccel.org/ccel/schaff/anf03.txt", father: "tertullian", file: "anf03-tertullian-apologetic.txt" },
  { url: "https://www.ccel.org/ccel/schaff/anf04.txt", father: "tertullian", file: "anf04-tertullian-part4.txt" },

  // ── Irenaeus ──
  { url: "https://www.ccel.org/ccel/schaff/anf01.txt", father: "irenaeus", file: "anf01-apostolic-fathers-irenaeus.txt" },

  // ── Clement of Alexandria ──
  { url: "https://www.ccel.org/ccel/schaff/anf02.txt", father: "clement_alex", file: "anf02-clement-alexandria.txt" },

  // ── Hippolytus ──
  { url: "https://www.ccel.org/ccel/schaff/anf05.txt", father: "hippolytus", file: "anf05-hippolytus-cyprian.txt" },

  // ── Cyprian ──
  { url: "https://www.ccel.org/ccel/schaff/anf05.txt", father: "cyprian", file: "anf05-cyprian.txt" },

  // ── Leo the Great + Gregory the Great ──
  { url: "https://www.ccel.org/ccel/schaff/npnf212.txt", father: "leo_great", file: "npnf212-leo-gregory.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf213.txt", father: "gregory_great", file: "npnf213-gregory-great.txt" },

  // ── John Cassian ──
  { url: "https://www.ccel.org/ccel/schaff/npnf211.txt", father: "cassian", file: "npnf211-cassian.txt" },

  // ── Hilary of Poitiers + John of Damascus ──
  { url: "https://www.ccel.org/ccel/schaff/npnf209.txt", father: "hilary", file: "npnf209-hilary-john-damascus.txt" },

  // ── Eusebius ──
  { url: "https://www.ccel.org/ccel/schaff/npnf201.txt", father: "eusebius", file: "npnf201-eusebius-church-history.txt" },

  // ── Apostolic Fathers (shared folder) ──
  { url: "https://www.ccel.org/ccel/schaff/anf01.txt", father: "apostolic_fathers", file: "anf01-apostolic-fathers.txt" },

  // ── Lactantius + others ANF VII ──
  { url: "https://www.ccel.org/ccel/schaff/anf07.txt", father: "lactantius", file: "anf07-lactantius.txt" },
];

// ── Clean raw text ────────────────────────────────────────────
function cleanText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    // Remove CCEL header boilerplate
    .replace(/^.*?(?=PREFACE|PROLEGOMENA|INTRODUCTION|CHAPTER I|BOOK I|HOMILY I)/s, "")
    // Remove excessive blank lines
    .replace(/\n{4,}/g, "\n\n\n")
    // Remove page markers
    .replace(/\[pg \d+\]/gi, "")
    .replace(/\[p\.\s*\d+\]/gi, "")
    // Remove footnote markers like [1], [2] etc at start of line
    .replace(/^\[\d+\]\s*/gm, "")
    .trim();
}

// ── Download a URL with redirect following ────────────────────
function download(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; patristics-scraper/1.0)" } }, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return download(redirectUrl, retries).then(resolve).catch(reject);
        }
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }

      let data = "";
      res.setEncoding("utf8");
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", (err) => {
      if (retries > 0) {
        console.log(`    Retrying... (${retries} left)`);
        setTimeout(() => download(url, retries - 1).then(resolve).catch(reject), 2000);
      } else {
        reject(err);
      }
    });
  });
}

// ── Try alternate URL formats ─────────────────────────────────
async function downloadWithFallback(url) {
  // Try .txt first
  try {
    const text = await download(url);
    if (text.length > 1000) return text;
  } catch (e) {
    // fall through
  }

  // Try without .txt extension (some CCEL pages serve HTML)
  const htmlUrl = url.replace(".txt", "");
  try {
    const html = await download(htmlUrl);
    // Strip HTML tags
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&#\d+;/g, "");
    if (text.length > 1000) return text;
  } catch (e) {
    // fall through
  }

  throw new Error(`Could not download ${url}`);
}

// ── Process a single volume ───────────────────────────────────
async function processVolume(vol) {
  const dir = path.join("data", vol.father);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const dest = path.join(dir, vol.file);

  // Skip if already downloaded
  if (fs.existsSync(dest)) {
    const size = fs.statSync(dest).size;
    if (size > 10000) {
      console.log(`    ↷ Already exists (${Math.round(size / 1024)}kb) — skipping`);
      return { success: true, skipped: true };
    }
  }

  try {
    const raw = await downloadWithFallback(vol.url);
    const cleaned = cleanText(raw);

    if (cleaned.length < 500) {
      throw new Error(`Content too short (${cleaned.length} chars) — may be an error page`);
    }

    fs.writeFileSync(dest, cleaned, "utf-8");
    console.log(`    ✓ Saved ${Math.round(cleaned.length / 1024)}kb → ${dest}`);
    return { success: true };
  } catch (err) {
    console.log(`    ✗ Failed: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const targetFather = process.argv[2];

  const volumes = targetFather
    ? VOLUMES.filter(v => v.father === targetFather)
    : VOLUMES;

  if (volumes.length === 0) {
    console.log(`No volumes found for father: ${targetFather}`);
    console.log("Available:", [...new Set(VOLUMES.map(v => v.father))].join(", "));
    return;
  }

  console.log(`\n✝  Patristic Library Scraper`);
  console.log(`   Downloading ${volumes.length} volume(s)...\n`);

  const results = { success: 0, skipped: 0, failed: 0, errors: [] };

  // Group by father for nicer output
  const byFather = {};
  volumes.forEach(v => {
    if (!byFather[v.father]) byFather[v.father] = [];
    byFather[v.father].push(v);
  });

  for (const [father, vols] of Object.entries(byFather)) {
    console.log(`\n── ${father.toUpperCase()} (${vols.length} volumes)`);

    for (const vol of vols) {
      console.log(`  ${vol.file}`);
      // Small delay between requests to be respectful to CCEL
      await new Promise(r => setTimeout(r, 500));
      const result = await processVolume(vol);

      if (result.skipped) results.skipped++;
      else if (result.success) results.success++;
      else {
        results.failed++;
        results.errors.push(`${vol.file}: ${result.error}`);
      }
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✓ Downloaded: ${results.success}`);
  console.log(`↷ Skipped:    ${results.skipped}`);
  console.log(`✗ Failed:     ${results.failed}`);

  if (results.errors.length > 0) {
    console.log(`\nFailed files:`);
    results.errors.forEach(e => console.log(`  - ${e}`));
    console.log(`\nNote: Some CCEL URLs may not serve .txt directly.`);
    console.log(`For failed files, manually copy text from ccel.org and save to data/<father>/`);
  }

  console.log(`\nNext step: node scripts/ingest.js`);
}

main().catch(console.error);
