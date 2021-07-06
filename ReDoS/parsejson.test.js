//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-parsejson.js





test("ReDos in parsejson", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const parsejson = require('parsejson');

    let str =  genstr(81750, '5') + ""; //progblematic regex: /.*[\.\/\\]/, in mime.js

    let t =measureTime(function () {
        parsejson("{\"a\":\"" + genstr(50000, " ") + "\"}");
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});