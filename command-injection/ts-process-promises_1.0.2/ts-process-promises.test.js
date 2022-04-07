test("Command Injection in ts-process-promises", () => {
  expect.assertions(2);
  const a = require("ts-process-promises");
  const fs = require("fs");
  const path = "./ts-process-promises";
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
  return a.exec("touch ts-process-promises", {}).finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
