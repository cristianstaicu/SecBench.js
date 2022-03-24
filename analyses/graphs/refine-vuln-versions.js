const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const TARGET_FOLDER = path.resolve(__dirname, "../../prototype-pollution");
const TMP_FOLDER = "/tmp/versions-analysis";
let newResult = [];
if (!fs.existsSync(TMP_FOLDER)) {
  fs.mkdirSync(TMP_FOLDER);
  fs.writeFileSync(`${TMP_FOLDER}/jest.config.json`, "{}");
}
let outFile = path.resolve("./vuln-versions_new.csv");
let versions = JSON.parse(
  fs.readFileSync("./all-versions_prototype-pollution.json")
);
let count = 0;

// console.log(versions);
versions = Object.keys(versions)
  .sort((a, b) => versions[b].length - versions[a].length)
  .reverse()
  .reduce((acc, key) => ((acc[key] = versions[key]), acc), {});
// for (const key of Object.keys(versions)) {
//     console.log(key + ":" + versions[key].length)
// }

let keys = [];
for (let key in versions) {
  keys.push(key);
}
let step = 5;
let currResult = fs
  .readFileSync("./vuln-versions_new.csv")
  .toString()
  .split("\n");
// console.log(currResult.length);
let done_so_far = currResult.length + 1;
for (let index = done_so_far; index < keys.length; index += step) {
  // let done_so_far = fs.readFileSync("./done_so_far.txt").toString();
  console.log("done_so_far", done_so_far);
  let result_str = "";
  for (let i = done_so_far; i < done_so_far + step; i++) {
    try {
      let entry = keys[i];
      if (entry.includes("@uifabric/utilities")) continue;
      // if(entry.includes("i18next"))continue;
      currResult = versions[entry];
      // console.log(`Pkgs: ${i}/${currResult.length} ${entry}`);

      let test = findTest(entry);
      if (!test) {
        console.log("Unable to find test for " + entry);
        continue;
      }
      fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`);
      let currVs = versions[entry];
      process.chdir(TMP_FOLDER);
      let countVuln = 0;
      let results = [];
      for (let j = 0; j < currVs.length; j++) {
        let output;
        try {
          cp.execSync(`npm install ${entry}@${currVs[j]}`);
          let res = cp.execSync(`jest --json ./poc.test.js`);
          output = JSON.parse(res.toString());
          // console.log(output);
          if (output.numPassedTests) {
            results.push("PASSED");
            countVuln++;
          } else {
            results.push("FAILED");
          }
        } catch (e) {
          console.log(e);
          results.push("FAILED");
          // output = e.stdout.toString();
        }
      }
      // console.log(results);
      // if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {
      //     console.log("CANDIDATE FOR REGRESSION");
      // }
      // entry[2] = countVuln
      // console.log(results);
      // newResult.push(entry.join(","));

      result_str +=
        entry + "," + (currVs.length - countVuln) + "," + countVuln + "\n";
    } catch (e) {}
  }
  fs.writeFileSync(outFile, result_str, { flag: "a+" });
  done_so_far += step;
  // fs.writeFileSync("./done_so_far.txt", done_so_far+step,{ flag: "w"});
}

// let currResult = fs.readFileSync("./vuln-versions.csv").toString().split("\n");
// let newResult = [];
// if (!fs.existsSync(TMP_FOLDER)){
//     fs.mkdirSync(TMP_FOLDER);
//     fs.writeFileSync(`${TMP_FOLDER}/jest.config.json`,"{}")
// }

// for (let i = 0; i < currResult.length; i++) {
//     let entry = currResult[i].split(",");
//     console.log(`Pkgs: ${i}/${currResult.length} ${entry[0]}`);
//     if (entry[1] == 1)
//         entry[2] = 1;
//     if (entry[2] == 0 && i >= 160 && i < 170) {
//         let test = findTest(entry[0]);
//         if (!test) {
//             console.log("Unable to find test for " + entry[0])
//             continue;
//         }
//         fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`)
//         let currVs = versions[entry[0]];
//         process.chdir(TMP_FOLDER);
//         let countVuln = 0;
//         let results = []
//         for (let j = 0; j < currVs.length; j++) {
//             let output;
//             try {
//                 cp.execSync(`npm install ${entry[0]}@${currVs[j]}`);
//                 let res = cp.execSync(`jest --json ./poc.test.js`);
//                 output = JSON.parse(res.toString());
//                 if (output.numPassedTests) {
//                     results.push("PASSED");
//                     countVuln++;
//                 } else {
//                     results.push("FAILED")
//                 }
//             } catch(e) {
//                 results.push("FAILED")
//                 // output = e.stdout.toString();
//             }
//         }
//         console.log(results);
//         if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {
//             console.log("CANDIDATE FOR REGRESSION");
//         }
//         entry[2] = countVuln
//     }
//     newResult.push(entry.join(","));

// }
// fs.writeFileSync(outFile, newResult.join("\n"));

function findTest(substr) {
  let entries = fs.readdirSync(TARGET_FOLDER);
  for (let i = 0; i < entries.length; i++) {
    try {
      let deps = Object.keys(
        JSON.parse(
          fs.readFileSync(`${TARGET_FOLDER}/${entries[i]}/package.json`)
        ).dependencies
      );
      if (deps.indexOf(substr) != -1) {
        let innerEntries = fs.readdirSync(`${TARGET_FOLDER}/${entries[i]}`);
        for (let j = 0; j < innerEntries[j].length; j++)
          if (innerEntries[j].match("test.js")) {
            return `${TARGET_FOLDER}/${entries[i]}/${innerEntries[j]}`;
          }
      }
    } catch (e) {}
  }
  return "";
}
