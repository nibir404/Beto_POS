// Some hosts only accept text uploads. When images arrive as base64 text in
// assets-b64/, turn them back into binary files under public/ before building.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const src = "assets-b64";
if (existsSync(src)) {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  for (const file of walk(src).filter((f) => f.endsWith(".b64"))) {
    const out = join("public", file.slice(src.length + 1, -4));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(readFileSync(file, "utf8"), "base64"));
  }
}
