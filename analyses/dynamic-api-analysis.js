const fs = require("fs");
const path = require("path");

const TARGET_FOLDER = path.resolve(__dirname, "../prototype-pollution");

let moduleUnderTest;
let results = {}
let reqMods = [];

const Mod = require('module');
const req = Mod.prototype.require;
Mod.prototype.require = function () {   
    reqMods.push(arguments[0]);
    let result = req.apply(this, arguments);
    if (arguments[0] === moduleUnderTest) {
        //TODO: only consider functions
        results.declaredProperties = Object.getOwnPropertyNames(result);
        results.accessedProperties = new Set();
        const handler = {
            get: function(target, prop, receiver) {
                results.accessedProperties.add(prop);                
                return target[prop];
            }
        };                
        return new Proxy(result, handler);
    }
    return result;
};
  

expect = () => {
  return {
    toBe: () => {},
  };
};
expect.toBe = () => {};

test = function (a, f) {
  moduleUnderTest = a.replace(/.* in /, "");
  f();
};

let folders = fs.readdirSync(path.resolve(TARGET_FOLDER));

for (let j = 0; j < folders.length; j++) {

  let currentDir = `${TARGET_FOLDER}/${folders[j]}`;
  let files;
  try {
    files = fs.readdirSync(path.resolve(currentDir));
  } catch(e) {
    continue;
  } 
   for (let i = 0; i < files.length; i++) {
    if (files[i].match(/.*test.js/)) {      
      let testPath = path.resolve(currentDir, files[i]);      
      try {
        reqMods = [];
        require(testPath);
        console.log(`==== Packege ${moduleUnderTest} ==== \n Number of exported properties: ${Array.from(results.accessedProperties)} \n ${results.declaredProperties}`);
      } catch (e) {        
        continue;
      }
    }
  }
}