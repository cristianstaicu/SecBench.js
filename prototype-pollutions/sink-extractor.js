const fs = require("fs");
const path = require("path");

let stack;
let moduleUnderTest;

Object.defineProperty(Object.prototype, "polluted", {
    set : function () {        
        stack = (new Error()).stack.toString().split("\n");        
    }
});

expect = () => {
    return {
        toBe: () => {}
    }
};
expect.toBe = () => {};

test = function(a, f) {
    moduleUnderTest = a.replace(/.* in /, "");
    f();
}

let files = fs.readdirSync(path.resolve(__dirname));
// let inscope = fs.readdirSync("");

for (let i = 0; i < files.length; i++ ) {    
    if (files[i].match(/.*test.js/)) {  //&& inscope.indexOf(files[i]) != -1
        let testPath = path.resolve(__dirname, files[i])
        stack = null;
        try {        
            require(testPath);
            let location = stack[2].replace(/.*vulnerabilities4js/, ".").replace(/\)/g,"").replace("    at ", "")
            if (location.indexOf("node_modules") == -1 || location.indexOf(moduleUnderTest) === -1)
                location = stack[3].replace(/.*vulnerabilities4js/, ".").replace(/\)/g,"").replace("    at ", "")
            console.log(`${files[i]},${location}`);            
        } catch(e) {
            console.log(`${files[i]}\n`);
            // console.log(`Error in ${files[i]}\n`);
            continue;
        }        
    }
}