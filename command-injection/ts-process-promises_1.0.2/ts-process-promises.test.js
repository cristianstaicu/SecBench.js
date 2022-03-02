//checking that its not present already
test("Command Injection in ts-process-promises", () => {
  expect.assertions(2);
  const a = require("ts-process-promises");
  const fs = require("fs");
  const path = "./ts-process-promises";
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
  a.exec("touch ts-process-promises", {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
