const fs = require("fs");
const path = require("path");
global.beforeEach(() => {
    let handler = {
        get: function (target, prop, receiver) {        
            global.accessedProperties.add(prop);
            return target[prop];
        },
    };    
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
   console.log("Result for heatmap: " + Math.floor(global.accessedProperties.size /global.declaredProperties.length * 10));
});