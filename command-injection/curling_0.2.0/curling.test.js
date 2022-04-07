test("Command Injection in curling", (done) => {
  expect.assertions(2);
  const root = require("curling");
  const fs = require("fs");
  const path = "./curling";
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
  root.run("& touch curling", function (err) {
    if (err) throw err;
    else {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
      done();
    }
  });
});
