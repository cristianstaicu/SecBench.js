//https://security.snyk.io/vuln/SNYK-JS-TRIMOFFNEWLINES-1296850
test("ReDos in trim-off-newlines", () => {
  const measureTime = require("../utils").measureTime;
  const trim = require("trim-off-newlines");

  const s = "a" + "\n".repeat(45000) + "a";

  let t = measureTime(function () {
    trim(s);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
