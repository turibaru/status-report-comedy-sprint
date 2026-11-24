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
