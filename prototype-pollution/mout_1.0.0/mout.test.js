//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25948
test("prototype pollution in mout ", () => {
  var mout = require("mout");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  mout.object.set(obj, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
