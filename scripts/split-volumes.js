// ============================================================
// Volume Splitter
//
// Takes the raw ANF + NPNF volumes in data/raw_volumes/
// and splits them into data/<fatherId>/ folders.
//
// Some volumes contain one Father (Augustine I = npnf101)
// Others contain multiple (npnf207 = Cyril of Jerusalem + Gregory Naz)
// This script handles both cases.
//
// Run: node scripts/split-volumes.js
// ============================================================

import fs from "fs";
import path from "path";

const RAW_DIR = path.join("data", "raw_volumes");

// ── Volume → Father(s) mapping ───────────────────────────────
// For single-Father volumes, just assign whole volume.
// For multi-Father volumes, list each Father and optional split markers.
const VOLUME_MAP = [
  // ── ANF (Ante-Nicene Fathers) ─────────────────────────────
  // ANF I: Apostolic Fathers + Justin Martyr + Irenaeus
  { volume: "anf01.txt", fathers: [
    { id: "apostolic_fathers", until: "JUSTIN MARTYR" },
    { id: "justin_martyr", until: "IRENAEUS" },
    { id: "irenaeus" },
  ]},

  // ANF II: Second Century Fathers (Hermas, Tatian, Theophilus, Athenagoras, Clement of Alexandria)
  { volume: "anf02.txt", fathers: [
    { id: "clement_alex", from: "CLEMENT OF ALEXANDRIA" },
    // Everything before Clement goes to "second_century"
  ], beforeFirst: "second_century" },

  // ANF III: Tertullian (apologetic, anti-Marcion, ethical)
  { volume: "anf03.txt", fathers: [{ id: "tertullian" }] },

  // ANF IV: Tertullian Part IV + Minucius Felix + Commodian + Origen
  { volume: "anf04.txt", fathers: [
    { id: "tertullian", until: "MINUCIUS FELIX" },
    { id: "minor_anf", until: "ORIGEN" },
    { id: "origen" },
  ]},

  // ANF V: Hippolytus, Cyprian, Caius, Novatian
  { volume: "anf05.txt", fathers: [
    { id: "hippolytus", until: "CYPRIAN" },
    { id: "cyprian", until: "CAIUS" },
    { id: "minor_anf" },
  ]},

  // ANF VI: Gregory Thaumaturgus, Dionysius, Julius Africanus, Methodius, Arnobius
  { volume: "anf06.txt", fathers: [{ id: "minor_anf" }] },

  // ANF VII: Lactantius + others
  { volume: "anf07.txt", fathers: [{ id: "lactantius" }] },

  // ANF VIII: Misc patriarchs, apocrypha, clementia
  { volume: "anf08.txt", fathers: [{ id: "minor_anf" }] },

  // ANF IX: Origen Commentaries + recent additions
  { volume: "anf09.txt", fathers: [{ id: "origen" }] },

  // ── NPNF Series 1 (Augustine + Chrysostom) ───────────────
  // Augustine: NPNF1 vols 1-8
  { volume: "npnf101.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf102.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf103.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf104.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf105.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf106.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf107.txt", fathers: [{ id: "augustine" }] },
  { volume: "npnf108.txt", fathers: [{ id: "augustine" }] },

  // Chrysostom: NPNF1 vols 9-14
  { volume: "npnf109.txt", fathers: [{ id: "chrysostom" }] },
  { volume: "npnf110.txt", fathers: [{ id: "chrysostom" }] },
  { volume: "npnf111.txt", fathers: [{ id: "chrysostom" }] },
  { volume: "npnf112.txt", fathers: [{ id: "chrysostom" }] },
  { volume: "npnf113.txt", fathers: [{ id: "chrysostom" }] },
  { volume: "npnf114.txt", fathers: [{ id: "chrysostom" }] },

  // ── NPNF Series 2 ─────────────────────────────────────────
  // NPNF2 I: Eusebius
  { volume: "npnf201.txt", fathers: [{ id: "eusebius" }] },

  // NPNF2 II: Socrates + Sozomen (church historians)
  { volume: "npnf202.txt", fathers: [{ id: "church_historians" }] },

  // NPNF2 III: Theodoret + Jerome + Rufinus
  { volume: "npnf203.txt", fathers: [
    { id: "theodoret", until: "JEROME" },
    { id: "jerome", until: "RUFINUS" },
    { id: "rufinus" },
  ]},

  // NPNF2 IV: Athanasius
  { volume: "npnf204.txt", fathers: [{ id: "athanasius" }] },

  // NPNF2 V: Gregory of Nyssa
  { volume: "npnf205.txt", fathers: [{ id: "gregory_nyssa" }] },

  // NPNF2 VI: Jerome
  { volume: "npnf206.txt", fathers: [{ id: "jerome" }] },

  // NPNF2 VII: Cyril of Jerusalem + Gregory Nazianzen
  { volume: "npnf207.txt", fathers: [
    { id: "cyril_jerusalem", until: "GREGORY NAZIANZEN" },
    { id: "gregory_naz" },
  ]},

  // NPNF2 VIII: Basil
  { volume: "npnf208.txt", fathers: [{ id: "basil" }] },

  // NPNF2 IX: Hilary + John of Damascus
  { volume: "npnf209.txt", fathers: [
    { id: "hilary", until: "JOHN OF DAMASCUS" },
    { id: "john_damascus" },
  ]},

  // NPNF2 X: Ambrose
  { volume: "npnf210.txt", fathers: [{ id: "ambrose" }] },

  // NPNF2 XI: Sulpitius Severus + Vincent of Lerins + John Cassian
  { volume: "npnf211.txt", fathers: [
    { id: "minor_npnf", until: "JOHN CASSIAN" },
    { id: "cassian" },
  ]},

  // NPNF2 XII: Leo + Gregory the Great
  { volume: "npnf212.txt", fathers: [
    { id: "leo_great", until: "GREGORY THE GREAT" },
    { id: "gregory_great" },
  ]},

  // NPNF2 XIII: Gregory the Great II + Ephrem + Aphrahat
  { volume: "npnf213.txt", fathers: [
    { id: "gregory_great", until: "EPHRAIM" },
    { id: "ephrem", until: "APHRAHAT" },
    { id: "aphrahat" },
  ]},

  // NPNF2 XIV: Seven Ecumenical Councils
  { volume: "npnf214.txt", fathers: [{ id: "councils" }] },
];

// ── Find marker position case-insensitively ─────────────────
function findMarker(text, marker) {
  if (!marker) return -1;
  // Try multiple variations: ALL CAPS, Title Case, in headers
  const variations = [
    marker.toUpperCase(),
    marker,
    `\n${marker.toUpperCase()}\n`,
    `\n\n${marker.toUpperCase()}`,
  ];
  for (const v of variations) {
    const idx = text.indexOf(v);
    if (idx !== -1) return idx;
  }
  // Fallback: case-insensitive regex
  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const match = text.match(regex);
  return match ? match.index : -1;
}

// ── Split a volume by markers ─────────────────────────────────
function splitVolume(text, mapping) {
  const sections = [];
  let cursor = 0;

  // Handle "beforeFirst" — content before the first marker
  if (mapping.beforeFirst) {
    const firstMarker = mapping.fathers[0]?.from;
    if (firstMarker) {
      const idx = findMarker(text, firstMarker);
      if (idx > 0) {
        sections.push({ id: mapping.beforeFirst, text: text.slice(0, idx) });
        cursor = idx;
      }
    }
  }

  for (let i = 0; i < mapping.fathers.length; i++) {
    const father = mapping.fathers[i];
    const next = mapping.fathers[i + 1];

    let start = cursor;
    if (father.from) {
      const idx = findMarker(text.slice(cursor), father.from);
      if (idx !== -1) start = cursor + idx;
    }

    let end = text.length;
    if (father.until) {
      const idx = findMarker(text.slice(start), father.until);
      if (idx !== -1) end = start + idx;
    } else if (next) {
      // No explicit "until", look ahead to next father's marker
      const nextMarker = next.from || next.id.replace(/_/g, " ").toUpperCase();
      const idx = findMarker(text.slice(start), nextMarker);
      if (idx !== -1) end = start + idx;
    }

    const section = text.slice(start, end).trim();
    if (section.length > 500) {
      sections.push({ id: father.id, text: section });
    }
    cursor = end;
  }

  // If single father with no splits, take the whole volume
  if (sections.length === 0 && mapping.fathers.length === 1) {
    sections.push({ id: mapping.fathers[0].id, text: text.trim() });
  }

  return sections;
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(RAW_DIR)) {
    console.error(`✗ Folder not found: ${RAW_DIR}`);
    console.error(`  Make sure your raw volume files are in data/raw_volumes/`);
    process.exit(1);
  }

  console.log(`\n✝  Volume Splitter — Processing ${VOLUME_MAP.length} volumes\n`);

  const stats = {
    processed: 0,
    skipped: 0,
    fatherFiles: {}, // { fatherId: [files] }
  };

  for (const mapping of VOLUME_MAP) {
    const volumePath = path.join(RAW_DIR, mapping.volume);

    if (!fs.existsSync(volumePath)) {
      console.log(`  ⚠  ${mapping.volume} — file not found, skipping`);
      stats.skipped++;
      continue;
    }

    const text = fs.readFileSync(volumePath, "utf-8");
    const sections = splitVolume(text, mapping);

    console.log(`  ${mapping.volume} → ${sections.length} section(s)`);

    for (const section of sections) {
      const fatherDir = path.join("data", section.id);
      if (!fs.existsSync(fatherDir)) fs.mkdirSync(fatherDir, { recursive: true });

      const outFile = path.join(fatherDir, mapping.volume);
      fs.writeFileSync(outFile, section.text, "utf-8");

      const sizeKB = Math.round(section.text.length / 1024);
      console.log(`    → ${section.id}/${mapping.volume} (${sizeKB}kb)`);

      if (!stats.fatherFiles[section.id]) stats.fatherFiles[section.id] = [];
      stats.fatherFiles[section.id].push(mapping.volume);
    }

    stats.processed++;
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log(`✓ Processed: ${stats.processed} volumes`);
  console.log(`↷ Skipped:   ${stats.skipped}\n`);

  console.log(`Father coverage:`);
  const sortedFathers = Object.entries(stats.fatherFiles)
    .sort(([, a], [, b]) => b.length - a.length);
  for (const [id, files] of sortedFathers) {
    console.log(`  ${id.padEnd(22)} ${files.length} file(s)`);
  }

  console.log(`\nNext step: node scripts/ingest.js`);
  console.log(`(or per-father: node scripts/ingest.js augustine)`);
}

main().catch(console.error);
