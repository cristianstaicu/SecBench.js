//https://github.com/jarradseers/config-handler/issues/1
test("prototype pollution in config-handler", () => {
  expect({}.polluted).toBe(undefined);

  const config = require("config-handler")();

  expect({}.polluted).toBe("yes");
});
