//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-debug.js
test("ReDos in charset", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    process.env.DEBUG = "*";

    const debug = require('debug');
    let error = debug('app:error');
    error.log = function () {
    };

    
    var str = genstr(40000, ' ') + ""; //progblematic regex: /\s*\n\s*/g, in debug/src/node.js

    let t = measureTime(function () {
        error('x %o', {"test": str});
    });
    
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
  });