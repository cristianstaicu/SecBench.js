
test("ReDos in fresh", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    var fresh = require('fresh');

    var str = genstr(60000, ' ') + "x"; //progblematic regex: / *, */, in fresh/index.js
    
    let t = measureTime(function () {
        fresh({
            "if-none-match": str
        }, {
            "etag": 23
        })
    });
    });