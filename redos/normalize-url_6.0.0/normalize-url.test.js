test("ReDos in parsejson", () => {
  const measureTime = require("../utils").measureTime;
  const normalizeUrl = require("normalize-url");
  let t = measureTime(function () {
    try {
      normalizeUrl("data:" + ",#".repeat(1000) + "\nx");
    } catch (e) {}
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
