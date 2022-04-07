test("Command Injection in deferred-exec", async () => {
  expect.assertions(2);
  const a = require("deferred-exec");
  const fs = require("fs");
  const path = "./deferred-exec";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  await a(" touch deferred-exec ", {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
