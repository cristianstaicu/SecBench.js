var typed = require('typed-function');

// example resulting in throwing an error
var fn = typed("(){}+(function(){throw new Error('Hacked... should not have executed this function!!!')})();function a", { 
  "": function () {}
      });
