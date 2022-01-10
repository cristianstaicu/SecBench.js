test("ReDos in ssri", () => {
  const measureTime = require("../utils").measureTime;
  const ssri = require("ssri");
  const integrity =
    "sha512-00000000000000000000000000000000000000000000" +
    "?".repeat(25) +
    "\x1F";
  let t = measureTime(function () {
    const parsed = ssri.parse(integrity, {
      strict: true,
      single: true,
    });
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
