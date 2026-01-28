import { execSync } from "child_process";
import process from "process";

const args = process.argv.slice(2);
let versionPath = "";
const pathIndex = args.indexOf("--path");

if (pathIndex !== -1 && args.length > pathIndex + 1) {
  versionPath = args[pathIndex + 1];
}

const baseUrl = versionPath
  ? `/solid-demo-app/${versionPath}/`
  : "/solid-demo-app/";
const outDir = versionPath ? `dist/${versionPath}` : "dist";

console.log(
  `Building for ${versionPath ? "version: " + versionPath : "root"}...`
);
console.log(`Base URL: ${baseUrl}`);
console.log(`Output Directory: ${outDir}`);

// Construct the Vite command
// We use --emptyOutDir true to ensure the target directory is clean.
// Using npx vite to ensure we use the local dependency if not in PATH, though scripts usually have it.
const cmd = `vite build --sourcemap=false --base=${baseUrl} --outDir ${outDir} --emptyOutDir true`;

console.log(`Running: ${cmd}`);

try {
  execSync(cmd, { stdio: "inherit" });
} catch (error) {
  console.error("Build failed.");
  process.exit(1);
}
