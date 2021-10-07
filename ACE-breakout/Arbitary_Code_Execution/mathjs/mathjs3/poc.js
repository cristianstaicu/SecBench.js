const math = require("mathjs");

var object = {
  fn: function() {}
};

math.isSafeMethod(object, "constructor");
math.isSafeMethod(object, "hasOwnProperty");
math.isSafeMethod(object, "isPrototypeOf");
math.isSafeMethod(object, "propertyIsEnumerable");
math.isSafeMethod(object, "__defineGetter__");
math.isSafeMethod(object, "__defineSetter__");
math.isSafeMethod(object, "__lookupGetter__");
math.isSafeMethod(object, "__lookupSetter__");
