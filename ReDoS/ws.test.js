//https://snyk.io/vuln/SNYK-JS-WS-1296835
  test("ReDos in ws", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    
    const attack_str = 'b' + ' '.repeat(42000) + 'x';

    let t = measureTime(function () {
        attack_str.trim().split(/ *, */);

    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});