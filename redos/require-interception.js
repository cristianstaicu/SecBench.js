const fs = require("fs");
const path = require("path");
global.beforeEach(() => {
    let handler = {
        get: function (target, prop, receiver) {        
            global.accessedProperties.add(prop);
            return target[prop];
        },
    };    

    global.pushFct = function (line) {
        global.fctsLog.push(line);
    };
    
    global.popFct = function (line) {
        global.fctsLog.push("pop");
    };
    global.fctsLog = [];
    let testDir = path.dirname(expect.getState().testPath);
    let jFile = testDir + "/package.json";
    let deps = Object.keys(JSON.parse(fs.readFileSync(jFile)).dependencies);                
    for (let i = 0; i < deps.length; i++) {
        let currMod = deps[i];                
        let prefixed = testDir + "/node_modules/" + currMod;
        if (fs.existsSync(prefixed))
            currMod = prefixed;
        let result = jest.requireActual(currMod);
        global.accessedProperties = new Set();
        global.declaredProperties = Object.keys(result);    
        
        jest.doMock(currMod, cb => {            
            if (typeof result === "function") {
                global.declaredProperties.push("main");
                global.accessedProperties.add("main");
            }            
            return new Proxy(result, handler)
        });
    }
 });



global.afterEach(() => {   
   console.log(global.declaredProperties);
   console.log(global.accessedProperties);   
   let maxChain = getMaxLength(global.fctsLog) - 1;
   let percUsed = Math.floor(global.accessedProperties.size /global.declaredProperties.length * 10);
   if (maxChain >= 10) maxChain = 9;
   if (percUsed === 10) percUsed = 9;
   console.log("Result for heatmap: " + percUsed + ", " + maxChain);
});


function getMaxLength(fcts) {
    let curr = 0,
        max = 0;
    for (let i = 0; i < fcts.length; i++) {
        if (fcts[i] == "pop") {
        curr--;
        } else curr++;
        if (curr > max) max = curr;
    }
    return max;
}