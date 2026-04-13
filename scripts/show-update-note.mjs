import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const changelogPath = path.join(rootDir, "CHANGELOG.md");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version ?? "0.0.0";
const today = new Date().toISOString().slice(0, 10);

let latestEntry = "";

if (fs.existsSync(changelogPath)) {
  const changelog = fs.readFileSync(changelogPath, "utf8");
  const lines = changelog.split(/\r?\n/);
  let inCodeBlock = false;
  let collecting = false;
  const entryLines = [];

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (line.startsWith("## Build ")) {
      if (collecting) {
        break;
      }

      collecting = true;
    }

    if (collecting) {
      entryLines.push(line);
    }
  }

  latestEntry = entryLines.join("\n").trim();
}

const template = [
  `## Build ${version} - ${today}`,
  "",
  "- Added:",
  "- Changed:",
  "- Fixed:",
  "- Notes:",
].join("\n");

console.log(`Current build version: ${version}`);
console.log("");
console.log("Commit/push update format:");
console.log("");
console.log(template);

if (latestEntry) {
  console.log("");
  console.log("Latest changelog entry:");
  console.log("");
  console.log(latestEntry);
}
