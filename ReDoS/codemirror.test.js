//https://securitylab.github.com/advisories/GHSL-2021-030-redos-CodeMirror/
let basicCTypes = ["int", "long", "char", "short", "double", "float", "unsigned", "signed", "void", "bool"];


function cTypes(identifier) {
    return basicCTypes.propertyIsEnumerable(identifier) || /.+_t$/.test(identifier); // <- /.+_t$/ is the problem.
}


test("ReDos in platform", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    
    let str = genstr(65536, "a");

    let t = measureTime(function () {
        cTypes(str);
        // console.log(agent.os);
    });
    

    let time= t[0] +t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});