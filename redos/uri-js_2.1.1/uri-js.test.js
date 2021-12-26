//https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-16021
test("ReDos in uri-js", () => {
  const uri = require("uri-js");
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;

  let t = measureTime(function () {
    uri.parse(genstr(8, "/%c0%ae%c0%ae") + "/windows\\win.ini");
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
