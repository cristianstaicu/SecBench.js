let oldExec = require("child_process").exec;
require("child_process").exec = function() {
  console.log(arguments[0]);
  let stack = new Error().stack.toString().split("\n");
  // extract first location from the package => output as sink
  console.log(stack);
  return oldExec.apply(this, arguments);
}
// similar for execSync
