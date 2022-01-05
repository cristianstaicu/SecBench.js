//https://security.snyk.io/vuln/npm:safe-eval:20170830
test("Arbitrary code execution in safe-eval", () => {
  var safeEval = require("safe-eval");

  expect({}.polluted).toBe(undefined);

  try {
    safeEval("this.constructor.prototype.polluted=`yes`");
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
