const fs = require("fs");
const ejs = require("ejs");
fs.writeFileSync("tmp.txt", "<% process.mainModule.require('fs').writeFileSync('./ejs-success.txt', '23'); %>");
console.log(ejs.renderFile("tmp.txt", {}, (e, str) => { console.log(e);console.log(str);}));
fs.unlinkSync("tmp.txt");