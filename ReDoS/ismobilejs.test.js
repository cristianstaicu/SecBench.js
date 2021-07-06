//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-ismobilejs.js
test("ReDos in ismobilejs", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const ismobilejs = require('ismobilejs');
    
    
    let t =measureTime(function () {
        var agent = ismobilejs(genstr(20000, "X"));
        });
    
    });