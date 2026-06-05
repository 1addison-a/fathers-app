import fs from "fs";
import path from "path";
import https from "https";

const VOLUMES = [
  { url: "https://www.ccel.org/ccel/schaff/npnf101.txt", father: "augustine", file: "npnf101-confessions-letters.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf102.txt", father: "augustine", file: "npnf102-city-of-god.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf103.txt", father: "augustine", file: "npnf103-trinity.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf109.txt", father: "chrysostom", file: "npnf109-priesthood.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf110.txt", father: "chrysostom", file: "npnf110-matthew.txt" },
  { url: "https://www.ccel.org/ccel/schaff/npnf111.txt", father: "chrysostom", file: "npnf111-acts-romans.txt" },
  // add more as needed
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", reject);
  });
}

async function main() {
  for (const vol of VOLUMES) {
    const dir = path.join("data", vol.father);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, vol.file);
    console.log(`Downloading ${vol.file}...`);
    try {
      await download(vol.url, dest);
      console.log(`  ✓ saved to ${dest}`);
    } catch (e) {
      console.log(`  ✗ failed: ${e.message}`);
    }
  }
}

main();
