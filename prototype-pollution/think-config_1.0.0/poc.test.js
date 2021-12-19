//https://github.com/thinkjs/think-config/commit/31b82468d72f2e1456a27a4827cea378196db6db
test("prototype pollution in x-assign", () => {
  const Config = require("think-config");
  const config = new Config({ name: 2 });

  expect({}.polluted).toBe(undefined);

  let obj = {};
  config.set("name.__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
