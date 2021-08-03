////https://securitylab.github.com/advisories/GHSL-2020-306-redos-highlight-js/
test("ReDos in highlight.js", () => {    
    const measureTime = require("./utils").measureTime;
    let hljs = require('highlight.js/lib/core');
    let r = require('highlight.js/lib/languages/r');
    hljs.registerLanguage('r', r);

    let t = measureTime(function () {
        hljs.highlight('r', "#' @param \`x" + "\\_".repeat(22) +"_\ \code{numeric} foobar").value;
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });

