//https://snyk.io/vuln/SNYK-JS-MULTIINI-1048969
test("prototype pollution in multi-ini", () => {
  const ini = require("multi-ini");

  var obj = {};
  expect({}.polluted).toBe(undefined);

  let parsed = ini.read("./payload.toml", { encoding: "utf8" });
  expect({}.polluted).toBe("yes");
});
