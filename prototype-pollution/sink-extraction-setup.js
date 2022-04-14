const fs = require("fs");
const path = require("path");
var originalCookie = Object.getOwnPropertyDescriptor(
  Object.prototype,
  "polluted"
);
global.fctsLog = [];
global.pushFct = function (line) {
  global.fctsLog.push(line);
  // console.log("push!!!");
};

global.popFct = function (line) {
  global.fctsLog.push("pop");
  // console.log("pop==============>>>>>>>>>>!!!");
};

const Mod = require("module");
const req = Mod.prototype.require;
Mod.prototype.require = function () {
  reqMods.push(arguments[0]);
  let result = req.apply(this, arguments);
  if (arguments[0] === moduleUnderTest) {
    results.accessedProperties = new Set();
    results.declaredProperties = Object.keys(result);
    if (typeof result === "function") {
      results.declaredProperties.push("main");
      results.accessedProperties.add("main");
    }
    const handler = {
      get: function (target, prop, receiver) {
        // fctsLog = []
        results.accessedProperties.add(prop);
        return target[prop];
      },
    };
    return new Proxy(result, handler);
  }
  return result;
};

// console.log("original ===>> ", originalCookie);
// Object.defineProperty(Object.prototype, "polluted", {
//   set: function (value) {
//     stack = new Error().stack.toString().split("\n");
//     // console.log(stack);
//     for (let i = 0; i < stack.length; i++) {
//       let location = stack[i]
//         .replace(/.*vulnerabilities4js/, ".")
//         .replace(/\)/g, "")
//         .replace("    at ", "");
//       let index = stack[i].search("node_modules/");
//       // console.log("index ===> ", index);
//       if (index != -1) {
//         l1 = location.split("node_modules/");
//         if (l1.length == 3) {
//           l1 = l1[2];
//         } else l1 = l1[1];
//         // console.log("l1==>",l1);
//         l2 = l1.split(/\/(.+)/)[1].trim();
//         console.log("sink ==>", l2);
//         break;
//       }
//     }
//   },
// });
