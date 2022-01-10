test("ReDos in timespan", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const timespan = require("timespan");
  let t = measureTime(function () {
    var ts = new timespan.parseDate("NOW-" + genstr(30000, "1") + "milli");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
