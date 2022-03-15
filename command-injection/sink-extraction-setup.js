let oldExec = require("child_process").exec;
require("child_process").exec = function () {
  // console.log("arguments => ", arguments[0], typeof arguments[0]);
  let index = arguments[0].search("touch");
  // console.log("index ===> ", index);
  const regex = /[^\w-]/;
  end_index = arguments[0].slice(index + 6).search(regex);
  // console.log("end index ===> ", end_index);
  if (end_index == -1) {
    // console.log("package name ===> ", arguments[0].substring(index + 5));
    package_name = arguments[0].substring(index + 5).trim();
  } else {
    package_name = arguments[0]
      .substring(index + 6, index + 6 + end_index)
      .trim();
    // console.log(
    //   "package name ===> ", arguments[0].substring(index + 6, index+6+end_index)
    // );
  }
  let stack = new Error().stack.toString().split("\n");
  index = 0;
  for (let i = 0; i < stack.length; i++) {
    if (stack[i].includes(package_name) && !stack[i].includes(".test.js")) {
      index = i;
    }
  }
  console.log(stack[index]);
  let line = stack[index];
  last_index = line.lastIndexOf("/");
  // console.log(last_index);
  sink = line.substring(last_index + 1, line.length - 1);
  console.log(sink);
  // // extract first location from the package => output as sink
  // console.log(stack);
  return oldExec.apply(this, arguments);
};
// similar for execSync
