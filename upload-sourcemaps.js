const { exec, execSync } = require("child_process");

function runCmd(str) {
  return execSync(str, { stdio: "inherit" });
}

const version = execSync("git rev-parse HEAD", {encoding: "utf8"}).trim();
console.log(`Sourcemap for version: ${version}`);
console.log(`Rollbar Upload`);
runCmd(`./node_modules/.bin/rollbar-cli upload-sourcemaps ./build --access-token '' --url-prefix 'https://dynamichost/' --code-version '${version}'`);