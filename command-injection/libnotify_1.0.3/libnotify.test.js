//https://snyk.io/vuln/npm:libnotify:20130515
test("Command Injection in libnotify", () => {
  expect.assertions(2);
  const libnotify = require("libnotify");
  const fs = require("fs");
  const path = "./libnotify";
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
  libnotify.notify("$(touch libnotify)", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
