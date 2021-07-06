//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-ismobilejs.js
test("ReDos in ismobilejs", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const ismobilejs = require('ismobilejs');
    
    
    let t =measureTime(function () {
        let agent = ismobilejs(genstr(20000, "X"));
        });

        let time= t[0]+t[1]/1000000000;
    
        expect(time).toBeGreaterThan(1);
    
    });