//https://github.com/NaturalNode/natural/issues/625
test("ReDos in natural", () => {
  const measureTime = require("../utils").measureTime;
  const diceCoefficient = require("natural/lib/natural/distance/dice_coefficient.js");

  let attack_str = "a" + " ".repeat(33000) + "a";

  let t = measureTime(function () {
    diceCoefficient(attack_str, attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
