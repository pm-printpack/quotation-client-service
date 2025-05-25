const { execSync } = require("child_process");

const service = process.argv[2]; // e.g., "materials"
if (!service) {
  console.error("❌ Please provide a service name.");
  process.exit(1);
}

const regex = `src/.*\\/${service}\\.service\\.spec\\.ts$`;
const command = `NODE_ENV=development jest --testRegex="${regex}"`;

console.log(`Running: ${command}`);
execSync(command, { stdio: "inherit" });
