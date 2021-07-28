//https://github.com/markdown-it/markdown-it/issues/583
test("ReDos in markdown-it", () => {
    const measureTime = require("./utils").measureTime;
  
    let t = measureTime(function () {
        require("markdown-it")("commonmark").parse("*_".repeat(60000))
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  