const fs = require("fs");
const outfile = "./call_chain.txt";
const access_outfile = "./access.txt";
const path = require("path");

let moduleUnderTest;
let results = {};
let reqMods = [];
let fctsLog = [];
let successful = 0;

var originalCookie = Object.getOwnPropertyDescriptor(
  Object.prototype,
  "polluted"
);
global.fctsLog = [];
global.pushFct = function (line) {
  global.fctsLog.push(line);
  // console.log("push!!!");
  fs.appendFileSync(outfile, "push\n");
};

global.popFct = function (line) {
  global.fctsLog.push("pop");
  fs.appendFileSync(outfile, "pop\n");
  // console.log("pop==============>>>>>>>>>>!!!");
};

const Mod = require("module");
const req = Mod.prototype.require;
// console.log(req, moduleUnderTest);
// jest.resetModules();
// jest.doMock('101/set', () => {
//   return jest.fn(() => req('./node_modules/101/set'));
// });
// console.log("argument=====>>>");
Mod.prototype.require = function () {
  console.log("argument=====>>>", arguments[0]);
  fs.appendFileSync(outfile, "argument=====>>> ");
  console.log("argument=====>>>", arguments[0]);
  reqMods.push(arguments[0]);
  // let result = req.apply(this, arguments);
  if (arguments[0] === moduleUnderTest) {
    results.accessedProperties = new Set();
    results.declaredProperties = Object.keys(result);
    fs.appendFileSync(access_outfile, Object.keys(result).toString());
    // if (typeof result === "function") {
    //   results.declaredProperties.push("main");
    //   results.accessedProperties.add("main");
    // }
    const handler = {
      get: function (target, prop, receiver) {
        // fctsLog = []
        results.accessedProperties.add(prop);
        fs.appendFileSync(access_outfile, prop.toString());
        return target[prop];
      },
    };
    return new Proxy(result, handler);
  }
  // return result;
};

// const jestRuntime = require('jest-runtime');
// oldrequire = jestRuntime.prototype.requireModuleOrMock;
// jestRuntime.prototype.requireModuleOrMock = function(from, moduleName) {
//     console.log("hello!");
//     return require(this._resolveModule(from, moduleName));
//     // return oldrequire.apply(this, arguments);
// };

const jestRuntime = require("jest-runtime");
oldrequire = jestRuntime.prototype.requireModuleOrMock;
console.log(Object.getOwnPropertyNames(jestRuntime.prototype));
jestRuntime.prototype.requireModuleOrMock = function () {
  console.log("hello!");
  // return require(this._resolveModule(from, moduleName));
  // return oldrequire.apply(this, arguments);
};

// const jestRuntime = require('jest-runtime');
oldrequire = jestRuntime.prototype.requireModule;
jestRuntime.prototype.requireModule = function (from, moduleName) {
  console.log("heyyyyyyy");
  // return require(this._resolveModule(from, moduleName));
  return oldrequire.apply(this, arguments);
};

jestRuntime.prototype.requireActual = function () {
  console.log("fsdfsdfsd");
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
