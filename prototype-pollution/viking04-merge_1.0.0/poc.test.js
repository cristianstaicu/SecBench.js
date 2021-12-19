//https://github.com/viking04/merge/commit/baba40332080b38b33840d2614df6d4142dedaf6
test("prototype pollution in config-handler", () => {
  const merge = require("@viking04/merge");
  expect({}.polluted).toBe(undefined);

  let a = {};
  var prototype_pollution_test = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  merge(a, prototype_pollution_test);

  expect({}.polluted).toBe("yes");
});
