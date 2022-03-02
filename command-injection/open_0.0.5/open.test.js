//https://hackerone.com/reports/319473
test("Command Injection in open", () => {
  expect.assertions(2);
  const fs = require("fs");
  const path = "./open";
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
  require("open")("http://example.com/`touch open`");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
