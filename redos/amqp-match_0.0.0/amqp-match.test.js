test("ReDoS in amqp-match", () => {
  const match = require("amqp-match");
  const measureTime = require("../utils").measureTime;
  let t = measureTime(function () {
    match("f" + "0".repeat(19), "#.bar");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
