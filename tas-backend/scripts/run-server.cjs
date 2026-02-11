const fs = require("fs");
const { spawnSync } = require("child_process");
require("dotenv").config();

function replaceDockerHost(url, host, port) {
  if (!url) return url;
  return url.replace(new RegExp(`@${host}:${port}`, "g"), `@localhost:${port}`);
}

function replaceDockerEndpoint(endpoint, serviceName, port) {
  if (!endpoint) return endpoint;
  return endpoint.replace(
    new RegExp(`(^https?:\\/\\/)${serviceName}:${port}`, "i"),
    `$1localhost:${port}`,
  );
}

const mode = process.argv[2];
if (mode !== "dev" && mode !== "start") {
  console.error("Usage: node scripts/run-server.cjs <dev|start>");
  process.exit(1);
}

const isInsideDocker = fs.existsSync("/.dockerenv");
const env = { ...process.env };

if (!isInsideDocker) {
  const nextDatabaseUrl = replaceDockerHost(env.DATABASE_URL, "db", "5432");
  const nextS3Endpoint = replaceDockerEndpoint(env.S3_ENDPOINT, "minio", "9000");

  if (nextDatabaseUrl !== env.DATABASE_URL) {
    console.log("[server] Running outside Docker: DATABASE_URL host adjusted db -> localhost");
    env.DATABASE_URL = nextDatabaseUrl;
  }

  if (nextS3Endpoint !== env.S3_ENDPOINT) {
    console.log("[server] Running outside Docker: S3_ENDPOINT host adjusted minio -> localhost");
    env.S3_ENDPOINT = nextS3Endpoint;
  }
}

const cmd =
  mode === "dev"
    ? ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]
    : ["node", "dist/server.js"];

const result = spawnSync(cmd[0], cmd.slice(1), {
  stdio: "inherit",
  env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
