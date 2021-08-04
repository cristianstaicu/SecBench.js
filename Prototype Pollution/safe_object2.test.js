//https://snyk.io/vuln/SNYK-JS-SAFEOBJECT2-598801
test("prototype pollution in safe-object2", () => {
  const safeObj2 = require("safe-object2");
  const obj = safeObj2({});

  expect({}.polluted).toBe(undefined);

  obj.setter(["__proto__", "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
