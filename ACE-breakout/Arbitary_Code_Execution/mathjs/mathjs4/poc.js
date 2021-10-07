const math = require("mathjs");

var scope = {
  a: {}
};

math.eval("a.constructor = 1", scope);
