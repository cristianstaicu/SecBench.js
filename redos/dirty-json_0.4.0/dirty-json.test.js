//https://snyk.io/vuln/npm:dirty-json:20180213
test("ReDoS in dirty-json", () => {
  const dJSON = require("dirty-json");
  const measureTime = require("./utils").measureTime;

  let t = measureTime(function () {
    dJSON.parse(`{ test: "${"x".repeat(24)}\\`);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
