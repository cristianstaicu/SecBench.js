//https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-7753
test("ReDos in trim", () => {
  const measureTime = require("./utils").measureTime;
  const trim = require("trim");

  let t = measureTime(function () {
    trim("1" + " ".repeat(50000) + "1");
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
