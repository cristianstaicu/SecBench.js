test("ReDos in slug", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const slug = require("slug");
  let t = measureTime(function () {
    slug("\u2665" + genstr(50000, " ") + "\u2665");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
