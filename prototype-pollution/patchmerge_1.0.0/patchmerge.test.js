//https://security.snyk.io/vuln/SNYK-JS-PATCHMERGE-1086585
test("prototype pollution in patchmerge", () => {
  const patchMerge = require("patchmerge");

  expect({}.polluted).toBe(undefined);

  let obj = {};
  patchMerge(obj, JSON.parse('{ "__proto__": { "polluted": "yes" }}'));

  expect({}.polluted).toBe("yes");
});
