let oldExec = require("child_process").exec;
require("child_process").exec = function () {
  console.log("arguments => ", arguments[0], typeof arguments[0]);
  let index = arguments[0].search("touch");
  console.log("index ===> ", index);
  end_index = arguments[0].indexOf(" ", index + 6);
  console.log("end index ===> ", end_index);
  if (end_index == -1) {
    console.log("package name ===> ", arguments[0].substring(index + 5));
  } else
    console.log(
      "package name ===> ",
      arguments[0].substring(index + 5, end_index)
    );

  // let stack = new Error().stack.toString().split("\n");
  // // extract first location from the package => output as sink
  // console.log(stack);
  return oldExec.apply(this, arguments);
};
// similar for execSync
