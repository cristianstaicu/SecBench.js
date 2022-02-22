// aws-lambda-config.lambda
test("Command Injection in aws-lambda", () => {
  const root = require("aws-lambda");
  const fs = require("fs");
  const path = "./aws-lambda";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    root.deploy("aws-lambda-config", function () {
      sleep.sleep(5);
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
  } catch (e) {}
});
