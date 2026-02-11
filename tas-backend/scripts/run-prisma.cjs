const fs = require("fs");
const { spawnSync } = require("child_process");
require("dotenv").config();

function replaceDockerHost(url, host, port) {
  if (!url) return url;
  return url.replace(new RegExp(`@${host}:${port}`, "g"), `@localhost:${port}`);
}

const isInsideDocker = fs.existsSync("/.dockerenv");
const env = { ...process.env };

if (!isInsideDocker) {
  const nextDatabaseUrl = replaceDockerHost(env.DATABASE_URL, "db", "5432");
  if (nextDatabaseUrl !== env.DATABASE_URL) {
    console.log("[prisma] Running outside Docker: DATABASE_URL host adjusted db -> localhost");
    env.DATABASE_URL = nextDatabaseUrl;
  }
}

const args = process.argv.slice(2);
const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
