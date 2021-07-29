////https://securitylab.github.com/advisories/GHSL-2020-306-redos-highlight-js/

var hljs = require('highlight.js/lib/core');
var r = require('highlight.js/lib/languages/r');
hljs.registerLanguage('r', r);

const highlightedCode = hljs.highlight('r', "#' @param \`x\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\ \code{numeric} foobar").value

// test("ReDos in fast-csv", () => {
//     const genstr = require("./utils").genstr;
//     const measureTime = require("./utils").measureTime;
//     const hljs = require('highlight.js/lib/core');
//     let r = require('highlight.js/lib/languages/r');

//     hljs.registerLanguage('r', r);

//     let str1 = " "+ genstr(100000," ,") + "- ";// " , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , -"
    
//     let t = measureTime(function () {
//         const highlightedCode = hljs.highlight('r', "#' @param \`x\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\ \code{numeric} foobar").value

//     });
    
    
//     let time= t[0]+t[1]/1000000000;
    
//     expect(time).toBeGreaterThan(1);
//   });