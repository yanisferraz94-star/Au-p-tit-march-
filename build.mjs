import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/client", { recursive: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await cp("index.html", "dist/client/index.html");
await cp("styles.css", "dist/client/styles.css");
await cp("script.js", "dist/client/script.js");
await cp("public", "dist/client", { recursive: true });
await cp(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile(
  "dist/server/index.js",
  `export default { async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    return fetch(new URL(path, url.origin));
  } };\n`
);
