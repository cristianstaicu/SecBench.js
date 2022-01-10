test("ReDos in express-validators", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const expressValidators = require("express-validators");
  var Obj = { urlValue: "http://--:$$@------------------------------------!" };
  var rules = { urlValue: "url" };
  var messages = { urlValue: { url: "https://www.google.com/" } };
  let t = measureTime(function () {
    expressValidators.validator(Obj, rules, messages, function (
      err,
      validated
    ) {});
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
