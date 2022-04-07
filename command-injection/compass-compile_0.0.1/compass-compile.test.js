test("Command Injection in compass-compile", () => {
  expect.assertions(2);
  const Root = require("compass-compile");
  let root = new Root();
  const fs = require("fs");
  const path = "./compass-compile";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = { compassCommand: "touch compass-compile" };
  return root
    .compile(options)
    .then(() => {})
    .catch((err) => {})
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
