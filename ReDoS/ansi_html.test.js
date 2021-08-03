//https://github.com/Tjatse/ansi-html/issues/19
test("ReDos in ansi-html", () => {
    const measureTime = require("./utils").measureTime;
            
    let t = measureTime(function () {
        require('ansi-html')('\x1b[0m\x1b[' + '0'.repeat(30))
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  