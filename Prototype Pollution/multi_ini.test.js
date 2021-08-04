//https://snyk.io/vuln/SNYK-JS-MULTIINI-1048969
test("prototype pollution in multi-ini", () => {
  const ini = require("multi-ini");
  const path = require("path");

  expect({}.polluted).toBe(undefined);

  ini.read(path.resolve(__dirname, "./payload.toml"), { encoding: "utf8" });
  expect({}.polluted).toBe("yes");
});
