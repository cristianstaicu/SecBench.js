const fs = require("fs");
const path = require("path");
const cp = require("child_process");

let results = {};
let noVersions = 0;

const TARGET_FOLDER = path.resolve(__dirname, "../prototype-pollution");

let folders = fs.readdirSync(path.resolve(TARGET_FOLDER));

for (let j = 0; j < folders.length; j++) {    
  console.log(`${j}/${folders.length}, no versions so far ${noVersions}`);
  let currentDir = `${TARGET_FOLDER}/${folders[j]}`;
  let files;
  try {
    let jsonFile = JSON.parse(fs.readFileSync(`${currentDir}/package.json`));
    let deps = Object.keys(jsonFile.dependencies);
    let out = cp.execSync(`npm show ${deps[0]} versions --json`).toString()
    let allVersions = JSON.parse(out);
    results[deps[0]] = allVersions;
    noVersions += allVersions.length;
  } catch(e) {        
    continue;
  } 
  // break;
}
fs.writeFileSync("./graphs/all-versions.json", JSON.stringify(results));