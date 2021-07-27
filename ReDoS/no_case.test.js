//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-no-case.js

test("ReDos in no-case", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  const cc = require("no-case");

  let t = measureTime(function () {
    cc(genstr(50000, "X"));
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
