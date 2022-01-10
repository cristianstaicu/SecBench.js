test("ReDoS in ansi-html", () => {
  const measureTime = require("../utils").measureTime;
  let t = measureTime(function () {
    require("ansi-html")("\x1B[0m\x1B[" + "0".repeat(30));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
