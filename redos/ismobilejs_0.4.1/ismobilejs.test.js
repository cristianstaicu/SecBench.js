test("ReDos in ismobilejs", () => {
  const measureTime = require("../utils").measureTime;
  let ismobilejs = require("ismobilejs").Class;
  let t = measureTime(function () {
    ismobilejs("X".repeat(10000));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
