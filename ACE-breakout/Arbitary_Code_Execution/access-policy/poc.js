var a = require("access-policy");
var statements = '`;console.log(123);//';
data = {};

a.encode(statements,data)
