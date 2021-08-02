//https://snyk.io/vuln/npm:is-url:20180319
test("ReDos in is-url", () => {
  const measureTime = require("./utils").measureTime;  
  
  let t = measureTime(function () {
    const isurl = require('is-url');
    isurl('a://localhost' + '9'.repeat(40000) + '\t');
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
