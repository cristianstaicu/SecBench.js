
// require("./utils").monkeyPatch();

// measureTime(function () {
//     var agent = _.lowerCase(genstr(50000, "A"));
// });

// measureTime(function () {
//     var agent = _.upperCase(genstr(80000, "A"));
// });

// measureTime(function () {
//     var agent = _.camelCase(genstr(80000, "A"));
// });

// measureTime(function () {
//     var agent = _.kebabCase(genstr(80000, "A"));
// });

// measureTime(function () {
//     var agent = _.snakeCase(genstr(80000, "A"));
// });

// measureTime(function () {
//     var agent = _.startCase(genstr(80000, "A"));
// });
//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-lodash.js
test("ReDos in lodash", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    var _ = require('lodash');

    
    let t =measureTime(function () {
        var agent = _.lowerCase(genstr(50000, "A"));
    });

});