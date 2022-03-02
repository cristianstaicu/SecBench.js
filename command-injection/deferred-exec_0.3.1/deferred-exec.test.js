//https://snyk.io/vuln/SNYK-JS-DEFERREDEXEC-1050433
test("Command Injection in deferred-exec", async () => {
  expect.assertions(2);
  const a = require("deferred-exec");
  const fs = require("fs");
  const path = "./deferred-exec";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  await a(" touch deferred-exec ", {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
