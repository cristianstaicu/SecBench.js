test("ReDoS in debug", () => {
  const measureTime = require("../utils").measureTime;
  const genstr = require("../utils").genstr;

  process.env.DEBUG = "*";
  const debug = require("debug");
  let error = debug("app:error");
  error.log = function () {};
  // let str = " ".repeat(199999999) + "";
  var str = genstr(4000000, " ") + "";
  let t = measureTime(function () {
    error("x %o", { test: str });
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
