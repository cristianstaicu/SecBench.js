let fs = require("fs");
let output1 = JSON.parse(fs.readFileSync("/home/cris/work/playground/patches-analysis/out1.txt").toString());
let output2 = JSON.parse(fs.readFileSync("/home/cris/work/playground/patches-analysis/out4.txt").toString());
for (let i = 0; i < output1.testResults.length; i++) {
    let currTest = output1.testResults[i];
    let name = currTest.name.replace(/.*\//,"").replace(".test.js","");
    for (let j = 0; j < output2.testResults.length; j++) {
        let currTestSecond = output2.testResults[j];
        let secondName = currTestSecond.name.replace(/.*\//,"").replace("v3.test.js","");
        if (name === secondName && currTest.status === "failed" && currTestSecond.status === "passed") {
            console.log(name)
        }
    }
    // console.log(name + " " + currTest.status)
}
// console.log(output1.testResults[10].status)