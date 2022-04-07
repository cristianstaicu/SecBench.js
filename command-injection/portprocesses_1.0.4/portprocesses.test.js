test("Command Injection in portprocesses", () => {
  expect.assertions(2);
  const portprocesses = require("portprocesses");
  const fs = require("fs");
  const path = "./portprocesses";
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
  return portprocesses.killProcess("$(touch portprocesses)").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {});
  });
});
