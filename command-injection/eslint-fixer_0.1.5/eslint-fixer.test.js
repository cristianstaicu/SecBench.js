test("Command Injection in eslint-fixer", () => {
  expect.assertions(2);
  const fix = require("eslint-fixer");
  const fs = require("fs");
  const path = "./eslint-fixer";
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
  return fix("$(touch eslint-fixer)").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {});
  });
});
