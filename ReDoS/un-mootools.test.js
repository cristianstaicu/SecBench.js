
test("ReDos in mootools", () => {
    const Slick = require("./mootools-core/Source/Slick/Slick.Parser.js");
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
  
    let t = measureTime(function () {
        Slick.Slick.parse(":a(''''''''''''''''''''''''''''''''''''''''''''''''''''''");
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  