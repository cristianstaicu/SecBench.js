//https://security.snyk.io/vuln/SNYK-JS-ACCESSPOLICY-571490
test("Arbitrary code execution in localeval", () => {
  const localeval = require("localeval");

  expect({}.polluted).toBe(undefined);

  try {
    localeval("console.log((Object.prototype.polluted=`yes`))");
  } catch (e) {}

  expect({}.polluted).toBe("yes");
});
