const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const TARGET_FOLDER = path.resolve(__dirname, "../../prototype-pollution");
const TMP_FOLDER = "/tmp/versions-analysis";

let outFile = path.resolve("./vuln-versions.csv");
let versions = JSON.parse(fs.readFileSync("./all-versions.json"));
let currResult = fs.readFileSync("./vuln-versions.csv").toString().split("\n");
let newResult = [];
if (!fs.existsSync(TMP_FOLDER)){
    fs.mkdirSync(TMP_FOLDER);
    fs.writeFileSync(`${TMP_FOLDER}/jest.config.json`,"{}")
}

for (let i = 0; i < currResult.length; i++) {
    let entry = currResult[i].split(",");
    console.log(`Pkgs: ${i}/${currResult.length} ${entry[0]}`);    
    if (entry[1] == 1)
        entry[2] = 1;
    if (entry[2] == 0 && i >= 160 && i < 170) {
        let test = findTest(entry[0]);        
        if (!test) {
            console.log("Unable to find test for " + entry[0])
            continue;
        }
        fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`)
        let currVs = versions[entry[0]];
        process.chdir(TMP_FOLDER);
        let countVuln = 0;
        let results = []
        for (let j = 0; j < currVs.length; j++) {            
            let output;
            try {                
                cp.execSync(`npm install ${entry[0]}@${currVs[j]}`);
                let res = cp.execSync(`jest --json ./poc.test.js`);                
                output = JSON.parse(res.toString());                
                if (output.numPassedTests) {
                    results.push("PASSED");
                    countVuln++;
                } else {
                    results.push("FAILED")
                }
            } catch(e) {
                results.push("FAILED")
                // output = e.stdout.toString();
            }            
        }        
        console.log(results);
        if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {            
            console.log("CANDIDATE FOR REGRESSION");            
        }
        entry[2] = countVuln
    }
    newResult.push(entry.join(","));
    
}
fs.writeFileSync(outFile, newResult.join("\n"));

function findTest(substr) {
    let entries = fs.readdirSync(TARGET_FOLDER);    
    for (let i = 0; i < entries.length; i++){        
        try {
            let deps = Object.keys(JSON.parse(fs.readFileSync(`${TARGET_FOLDER}/${entries[i]}/package.json`)).dependencies);                        
            if (deps.indexOf(substr) != -1) {
                let innerEntries = fs.readdirSync(`${TARGET_FOLDER}/${entries[i]}`);            
                for (let j = 0; j < innerEntries[j].length; j++)
                    if (innerEntries[j].match("test.js")) {
                        return `${TARGET_FOLDER}/${entries[i]}/${innerEntries[j]}`;
                }
            }
        } catch(e){}
    }
    return "";
}