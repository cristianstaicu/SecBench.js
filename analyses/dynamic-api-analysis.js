const fs = require("fs");
const path = require("path");

require("@babel/register")({
  presets: [],
  plugins: [
    [require(`./babel-instrumentor.js`)],
    [require("@babel/plugin-transform-modules-commonjs").default],
  ],
  ignore: ["/**/analyses/**/*.js"],
  cache: false,
  sourceType: "unambiguous",
});

// const TARGET_FOLDER = path.resolve(__dirname, "../prototype-pollution");
const TARGET_FOLDER = path.resolve(__dirname, "../redos");

let moduleUnderTest;
let results = {};
let reqMods = [];
let fctsLog = [];
let successful = 0;

let outMatrix = [];
for (let i = 0; i < 10; i++) {
  outMatrix[i] = new Array(10);
  for (let j = 0; j < 10; j++) {
    outMatrix[i][j] = 0;
  }
}

global.pushFct = function (line) {
  fctsLog.push(line);
};

global.popFct = function (line) {
  fctsLog.push("pop");
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

expect = () => {
  return {
    toBe: () => {},
  };
};
expect.toBe = () => {};
expect.toBeGreaterThan = () => {};
expect().toBeGreaterThan = function () {};
expect.assertions = function () {};
done = () => {};
test = function (a, f) {
  moduleUnderTest = a.replace(/.* in /, "");
  f();
};

let folders = fs.readdirSync(path.resolve(TARGET_FOLDER));

for (let j = 0; j < folders.length; j++) {
  console.log(`${j}/${folders.length} ${successful}`);
  let currentDir = `${TARGET_FOLDER}/${folders[j]}`;
  let files;
  try {
    files = fs.readdirSync(path.resolve(currentDir));
  } catch (e) {
    continue;
  }

  // let jsonFile = JSON.parse(fs.readFileSync(`${currentDir}/package.json`));

  for (let i = 0; i < files.length; i++) {
    if (files[i].match(/.*test.js/)) {
      let testPath = path.resolve(currentDir, files[i]);
      // let testPathRaw = testPath.replace(".test.js", ".js");
      // try {
      // fs.unlinkSync(testPathRaw);
      // fs.unlinkSync(testPath.replace(".test.js", "js"));
      // } catch(e) {}
      // console.log(testPathRaw);
      // fs.copyFileSync(testPath, testPathRaw)
      try {
        reqMods = [];
        fctsLog = [];
        // console.log(testPath)
        require(testPath);
        //console.log(`==== Package ${moduleUnderTest} ==== \n Number of exported properties: ${Array.from(results.accessedProperties)} \n ${results.declaredProperties} \n ${fctsLog}`);
        console.log(
          `${Array.from(results.accessedProperties)} - ${
            results.declaredProperties
          }`
        );
        // console.log()
        let percUsed = Math.floor(
          (results.accessedProperties.size /
            results.declaredProperties.length) *
            10
        );
        if (percUsed === 10) percUsed = 9;
        // console.log(getMaxLength(fctsLog))
        let maxChain = getMaxLength(fctsLog);
        if (maxChain >= 10) maxChain = 9;

        console.log("Log.......>>> ", percUsed + " " + maxChain);
        outMatrix[percUsed][maxChain]++;
        successful++;
      } catch (e) {
        // process.exit(1);
        console.log(e);
        // continue;
      }
      delete Object.prototype.polluted;
      // process.exit(1);
    }
  }
  // break;
}

let out = "[";
for (let i = 0; i < 10; i++) {
  out += "[" + outMatrix[i] + "]" + (i != 9 ? "," : "");
}
out = out + "]";
console.log(out);

function getMaxLength(fcts) {
  let curr = 0,
    max = 0;
  for (let i = 0; i < fcts.length; i++) {
    if (fcts[i] == "pop") {
      curr--;
    } else curr++;
    if (curr > max) max = curr;
  }
  return max;
}
