test("ReDos in platform", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const platform = require("platform");
  let t = measureTime(function () {
    var agent = platform.parse("Windows Icarus6j" + genstr(40000, " ") + " ");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
