test("ReDoS in content", () => {
  const measureTime = require("../utils").measureTime;
  const content = require("content");
  let t = measureTime(function () {
    content.disposition("form-data;x" + " ".repeat(2000));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
