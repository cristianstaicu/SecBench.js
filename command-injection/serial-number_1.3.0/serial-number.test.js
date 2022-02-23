//https://snyk.io/vuln/SNYK-JS-SERIALNUMBER-559010
test("Command Injection in serial-number", () => {
  const root = require("serial-number");
  const fs = require("fs");
  const path = "./serial-number";
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
  root(function () {}, "touch serial-number;");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
