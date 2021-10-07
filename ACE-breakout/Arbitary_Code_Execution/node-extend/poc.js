var extend = require("node-extend");
foo = extend("function (){});console.log(234); //(){console.log(123)}","")
console.log(foo);
