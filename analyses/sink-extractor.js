const fs = require("fs");
const path = require("path");

const TARGET_FOLDER = path.resolve(__dirname, "../prototype-pollution");

let stack;
let moduleUnderTest;

Object.defineProperty(Object.prototype, "polluted", {
  set: function () {
    stack = new Error().stack.toString().split("\n");
  },
});

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
  // let inscope = fs.readdirSync("");

  for (let i = 0; i < files.length; i++) {
    if (files[i].match(/.*test.js/)) {
      //&& inscope.indexOf(files[i]) != -1
      let testPath = path.resolve(currentDir, files[i]);
      stack = null;
      try {
        require(testPath);
        let location = stack[2]
          .replace(/.*vulnerabilities4js/, ".")
          .replace(/\)/g, "")
          .replace("    at ", "");
        if (
          location.indexOf("node_modules") == -1 ||
          location.indexOf(moduleUnderTest) === -1
        )
          location = stack[3]
            .replace(/.*vulnerabilities4js/, ".")
            .replace(/\)/g, "")
            .replace("    at ", "");
        console.log(`${files[i]},${location}`);
      } catch (e) {
        console.log(`${files[i]}\n`);
        // console.log(`Error in ${files[i]}\n`);
        continue;
      }
    }
  }
}