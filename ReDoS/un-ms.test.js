//https://snyk.io/vuln/npm:ms:20170412
test("ReDos in ms", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const ms = require('ms');

    let attack_str = genstr(50000000, '1')
    let t = measureTime(function () {
        ms(attack_str) 
    });
    

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});
//only 0.3 seconds max