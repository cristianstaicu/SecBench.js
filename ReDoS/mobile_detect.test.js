//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-mobile-detect.js
test("ReDos in mobile-detect", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const MobileDetect = require('mobile-detect');

    let str =  genstr(81750, '5') + ""; //progblematic regex: /.*[\.\/\\]/, in mime.js

    let t =measureTime(function () {
        let md = new MobileDetect(genstr(12500, "Dell"));
        md.phone();
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});