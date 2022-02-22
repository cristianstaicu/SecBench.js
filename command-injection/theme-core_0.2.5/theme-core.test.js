//https://snyk.io/vuln/SNYK-JS-THEMECORE-1050425
test("Command Injection in theme-core", () => {
  const a = require("theme-core");
  const fs = require("fs");
  const path = "./theme-core";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  a.utils.sh("touch theme-core");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
