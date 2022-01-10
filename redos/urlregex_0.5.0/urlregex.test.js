test("ReDos in urlregex", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const urlRegex = require("urlregex");
  let t = measureTime(function () {
    const isValid = urlRegex().test(
      "http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321"
    );
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
