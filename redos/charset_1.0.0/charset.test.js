test("ReDoS in charset", () => {
  const measureTime = require("../utils").measureTime;
  const charset = require("charset");
  let t = measureTime(function () {
    charset("encoding=" + " ".repeat(40000));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
