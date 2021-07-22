//https://snyk.io/vuln/SNYK-JS-HTMLPARSESTRINGIFY2-1079307
  test("ReDos in html-parse-stringify2", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const HTML = require("html-parse-stringify2");

    let html = "<!''''''''''''''''''''''''''''''''''''''''!";

    let t = measureTime(function() {
        let ast = HTML.parse(html);

    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});