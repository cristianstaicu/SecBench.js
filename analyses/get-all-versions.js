const fs = require("fs");
const path = require("path");
const cp = require("child_process");

let results = {};
let noVersions = 0;
let count = 0;
// const folders_list = ['prototype-pollution', 'redos', 'path-traversal', 'command-injection', 'ace-breakout']
const folders_list = ["prototype-pollution"];

for (const folder_name of folders_list) {
  const TARGET_FOLDER = path.resolve(__dirname, "../" + folder_name);
  // console.log(TARGET_FOLDER);
  let folders = fs.readdirSync(path.resolve(TARGET_FOLDER));

  for (let j = 0; j < folders.length; j++) {
    console.log(`${j}/${folders.length}, no versions so far ${noVersions}`);
    let currentDir = `${TARGET_FOLDER}/${folders[j]}`;
    let files;
    try {
      let jsonFile = JSON.parse(fs.readFileSync(`${currentDir}/package.json`));
      let deps = Object.keys(jsonFile.dependencies);
      console.log(deps);
      let out = cp.execSync(`npm show ${deps[0]} versions --json`).toString();
      let allVersions = JSON.parse(out);
      console.log(deps[0], "===>>", allVersions.length);
      results[deps[0]] = allVersions;
      noVersions += allVersions.length;
      count += 1;
    } catch (e) {
      console.log(e);
    }
    // break;
  }
  // for (const key of Object.keys(results)) {
  //   console.log(key + ":" + results[key].length);
  //   count+=1;
  // }
  // console.log(count);
  // fs.writeFileSync("./graphs/all-versions_"+folder_name+".json", JSON.stringify(results,null,4));
}
console.log(count);
