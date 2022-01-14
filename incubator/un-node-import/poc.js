var a = require("node-import");
var params = {
  "console.log(`aaa`);//": 123,
};
a.module("x", params, true);
