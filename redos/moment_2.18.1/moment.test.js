test("ReDos in moment", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const moment = require("moment");
  let str = genstr(50000, "1") + "";
  let t = measureTime(function () {
    moment(str, "MMM");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
