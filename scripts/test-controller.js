const { execSync } = require("child_process");

const controller = process.argv[2]; // e.g., "materials"
if (!controller) {
  console.error("❌ Please provide a controller name.");
  process.exit(1);
}

const regex = `src/.*\\/${controller}\\.controller\\.spec\\.ts$`;
const command = `NODE_ENV=development jest --testRegex="${regex}"`;

console.log(`Running: ${command}`);
execSync(command, { stdio: "inherit" });
