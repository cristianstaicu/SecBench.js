//https://github.com/yibn2008/find-process/pull/44
test("Command Injection in find-process", () => {
  const find = require("find-process");
  const fs = require("fs");
  const path = "./find-process";
  const command = "$(touch find-process)";
  const sleep = require("sleep");
  find("pid", command);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
