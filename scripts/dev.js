// scripts/dev.js
import fs from "fs";
import { spawn } from "child_process";

let port = 6981;

// Load .env
if (fs.existsSync(".env")) {
  const env = fs.readFileSync(".env", "utf8");
  const match = env.match(/DEV_PORT=(.*)/);
  if (match) port = match[1].trim();
}

console.log("Using DEV_PORT:", port);

const commands = [
  `\"nuxt dev --port ${port}\"`,
  `\"wait-on tcp:localhost:${port} --timeout 60000 && electron .\"`
];

const cmd = `concurrently --names \"NUXT,ELECTRON\" --prefix-colors \"cyan,yellow\" ${commands.join(" ")}`;

const child = spawn(cmd, {
  shell: true,
  stdio: "inherit"
});

child.on("exit", (code) => process.exit(code));
