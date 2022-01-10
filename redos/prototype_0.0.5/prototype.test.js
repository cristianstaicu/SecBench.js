test("ReDos in prototype", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const prototype = require("prototype/lib/String");
  let t = measureTime(function () {
    let attack_str = "hello <span> <a " + genstr(37, "'") + "!";
    attack_str.stripTags();
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
