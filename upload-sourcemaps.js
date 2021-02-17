const { exec, execSync } = require("child_process");

function runCmd(str) {
  return execSync(str, { stdio: "inherit" });
}

const version = execSync("git rev-parse HEAD", {encoding: "utf8"}).trim();
console.log(`Sourcemap for version: ${version}`);
const sentryCli = "./node_modules/.bin/sentry-cli --auth-token '8d10c57458ff48f3b9bebebf5b97a4613a2e82726b6548d290bad8b20492e429'";
const pFlags = "-o 'vmware-tanzu' -p 'worker-sourcemaps'";
console.log(`Sentry Upload`);
runCmd(`${sentryCli} releases ${pFlags} new '${version}' --finalize`);
runCmd(`${sentryCli} releases ${pFlags} files '${version}' upload-sourcemaps ./build`);
