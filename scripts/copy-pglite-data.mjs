import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const destDir = join(root, ".vercel/output/functions/__server.func/_libs");

if (!existsSync(destDir)) {
  console.warn("[pglite] server bundle directory missing; skip");
} else {
  for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
    const src = join(srcDir, name);
    if (!existsSync(src)) {
      console.warn("[pglite] missing", src);
      continue;
    }
    copyFileSync(src, join(destDir, name));
  }
  console.log("[pglite] copied runtime files for the server bundle");
}
