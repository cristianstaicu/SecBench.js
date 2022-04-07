test("Command Injection in killport", () => {
  expect.assertions(2);
  const killport = require("killport");
  const fs = require("fs");
  const path = "./killport";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return killport("$(touch killport); #").catch(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {});
  });
});
