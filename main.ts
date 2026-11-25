import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// This little program has one job: carry the finished one-liner from
// the repo into the grader's output folder, untouched, so the text
// that gets judged is exactly the text we wrote and counted by hand.
// Nothing is generated or rewritten here; the file is the entry.
const here = path.dirname(fileURLToPath(import.meta.url));
const entryPath = path.join(here, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR;

if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

let text;
try {
  text = fs.readFileSync(entryPath, "utf8");
} catch (err) {
  console.error("entry.txt not found: " + err.message);
  process.exit(1);
}

if (text.length < 1 || text.length > 200) {
  console.error("entry.txt must be 1-200 characters, got " + text.length);
  process.exit(1);
}

try {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), text, "utf8");
} catch (err) {
  console.error("failed to write output: " + err.message);
  process.exit(1);
}
