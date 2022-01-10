test("ReDos in email-existence", () => {
  const measureTime = require("../utils").measureTime;
  const emailExistence = require("email-existence");
  let t = measureTime(function () {
    emailExistence.check("@".repeat(50000) + " ", () => {});
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
