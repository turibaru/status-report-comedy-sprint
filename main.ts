// This program only copies the entry text into the output directory the grader picks.
// It never renders, rewrites, or alters the text in any way — the file lands exactly as written.
// The length guard below keeps the entry inside the 1–200 character gate for this bounty.
// Nothing is read from outside this repo: the only input is the entry.txt sitting next to this file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here: string = dirname(fileURLToPath(import.meta.url));
const text: string = readFileSync(join(here, "entry.txt"), "utf8");

if (text.length < 1 || text.length > 200 || text.trim().length === 0) {
  console.error("entry.txt must be 1-200 characters and not only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
