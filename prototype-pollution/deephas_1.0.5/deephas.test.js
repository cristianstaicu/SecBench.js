//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28271
test("prototype pollution in deephas ", () => {
  expect({}.polluted).toBe(undefined);

  const dh = require("deephas");
  let obj = {};
  dh.set(obj, "__proto__.polluted", "yes");

  expect(obj.polluted).toBe("yes");
});
