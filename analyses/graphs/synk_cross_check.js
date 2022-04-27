const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const { exit } = require("process");
const { syncBuiltinESMExports } = require("module");

done_list = [];
// var data = fs.readFileSync("./cross_check_snyk.csv").toLocaleString();
// var rows = data.split("\n"); // SPLIT ROWS
// rows.forEach((row) => {
//     columns = row.split(","); //SPLIT COLUMNS
//     // console.log(columns[0]);
//     done_list.push(columns[0]);
// })

// let lines = fs.readFileSync("./snyk_missmatch_data.txt")
let lines = fs.readFileSync("./snyk_data_for_regression.txt");
let line_list = lines.toString().split("\n");
// console.log(line_list.length)
var package_dict = {};
var key = "";
for (let i = 0; i < line_list.length; i++) {
  if (line_list[i].trim().length != 0) {
    // console.log(line_list[i])
    parts = line_list[i].split(" ");
    key = parts[0].trim();
    version = parts[1].trim();
    // console.log(key, version);
    package_dict[key] = version;
    // console.log(parts)
    // if (line_list[i].includes("[")){
    //     // package_dict[key]=line_list[i].trim();
    //     line = line_list[i].replace("[","").replace("]","").trim();
    //     // console.log(key)
    //     parts = line.split(",")
    //     // console.log(parts.length)
    //     package_dict[key]=parts;
    // }
    // else key = line_list[i].trim()
  }
}

// for (let i=0;i<line_list.length;i++){
//     if(line_list[i].trim().length!=0){
//         // console.log(line_list[i])
//         if (line_list[i].includes("[")){
//             // package_dict[key]=line_list[i].trim();
//             line = line_list[i].replace("[","").replace("]","").trim();
//             // console.log(key)
//             parts = line.split(",")
//             // console.log(parts.length)
//             package_dict[key]=parts;
//         }
//         else key = line_list[i].trim()
//     }
// }
// console.log(package_dict.length)
// let count = 0;
// for(var key in package_dict) {
//     var value = package_dict[key];
//     console.log(value);
//     console.log("\n\n\n")
//     count++;
// }
// console.log(count);

// let outFile = path.resolve("./cross_check_snyk.csv");
// let detailResultFile = path.resolve("./cross_check_snyk_detail.txt");

let outFile = path.resolve("./cross_check_regression.csv");
let detailResultFile = path.resolve("./cross_check_regression_detail.txt");

// const TARGET_FOLDER = path.resolve(__dirname, "../../" + folder_name);
const TMP_FOLDER = "/tmp/versions-analysis";
if (!fs.existsSync(TMP_FOLDER)) {
  fs.mkdirSync(TMP_FOLDER);
  fs.writeFileSync(`${TMP_FOLDER}/jest.config.json`, "{}");
}
fs.copyFileSync("../../redos/utils.js", "/tmp/utils.js");
fs.copyFileSync("../../path-traversal/flag.html", "/tmp/flag.html");

fs.copyFileSync(
  "../../prototype-pollution/payload.toml",
  "/tmp/versions-analysis/payload.toml"
);

fs.copyFileSync(
  "../../prototype-pollution/payload.ini",
  "/tmp/versions-analysis/payload.ini"
);
fs.copyFileSync(
  "../../prototype-pollution/iniparserjs_1.0.4/test.ini",
  "/tmp/versions-analysis/test.ini"
);

for (var key in package_dict) {
  // if(key.includes("ms"))continue;
  // if(done_list.includes(key))continue;
  let result_str = "";
  try {
    entry = key;
    currResult = package_dict[key];
    // console.log(`Pkgs: ${currResult.length} ${entry}`);
    let test = findTest(entry);
    // console.log(test)
    if (test == "") {
      console.log("Unable to find test for " + entry);
      continue;
    }
    fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`);
    let currVs = package_dict[entry];
    process.chdir(TMP_FOLDER);
    let countVuln = 0;
    let results = [];

    let output;
    try {
      version_number = currResult.replace("'", "").replace("'", "").trim();
      console.log(version_number);
      console.log("Installing........................", entry, version_number);
      cp.execSync(`timeout -k 10 3m npm install ${entry}@${version_number}`);
      console.log("Done Installing....................");
      let res = cp.execSync(`jest --forceExit --json ./poc.test.js`);
      output = JSON.parse(res.toString());
      // console.log(output);
      if (output.numPassedTests) {
        results.push(entry + "-" + version_number + "->" + "PASSED");
        countVuln++;
      } else {
        results.push(entry + "-" + version_number + "->" + "FAILED");
      }
    } catch (e) {
      // console.log(e);
      results.push(entry + "-" + version_number + "->" + "FAILED");
      // output = e.stdout.toString();
    }
    try {
      cp.execSync(`npm uninstall ${entry}@${version_number}`);
    } catch (e) {}

    result_str += entry + "," + (1 - countVuln) + "," + countVuln + "\n";
    let details_str = "";
    for (let k = 0; k < results.length; k++) {
      details_str += results[k] + "\n";
    }
    console.log("writing details......");
    fs.writeFileSync(detailResultFile, details_str, { flag: "a+" });
    console.log("writing details done......");
  } catch (e) {
    console.log(e);
  }
  console.log("writing to csv......", result_str);
  // result_str = result_str.trim();
  fs.writeFileSync(outFile, result_str, { flag: "a+" });
}

// for(var key in package_dict) {
//     // if(key.includes("ms"))continue;
//     if(done_list.includes(key))continue;
//     let result_str = "";
//     try {
//         // if(entry.includes("i18next"))continue;
//         entry = key;
//         currResult = package_dict[key];
//         console.log(`Pkgs: ${currResult.length} ${entry}`);
//         let test = findTest(entry);
//         // console.log(test)
//         if (test=="") {
//             console.log("Unable to find test for " + entry);
//             continue;
//         }
//         fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`);
//         let currVs = package_dict[entry];
//         process.chdir(TMP_FOLDER);
//         let countVuln = 0;
//         let results = [];
//         for (let j = 0; j < currVs.length; j++) {
//             let output;
//             try {
//                 version_number = currVs[j].replace("'","").replace("\'","").trim()
//                 console.log(version_number);
//                 console.log("Installing........................", entry, version_number);
//                 cp.execSync(`timeout -k 10 3m npm install ${entry}@${version_number}`);
//                 console.log("Done Installing....................");
//                 let res = cp.execSync(`jest --forceExit --json ./poc.test.js`);
//                 output = JSON.parse(res.toString());
//                 // console.log(output);
//                 if (output.numPassedTests) {
//                     results.push(entry + "-" + version_number + "->" + "PASSED");
//                     countVuln++;
//                 } else {
//                     results.push(entry + "-" + version_number + "->" + "FAILED");
//                 }
//             } catch (e) {
//                 // console.log(e);
//                 results.push(entry + "-" + version_number + "->" + "FAILED");
//                 // output = e.stdout.toString();
//             }
//             try {
//               cp.execSync(`npm uninstall ${entry}@${version_number}`);
//             } catch (e) {}
//             // console.log("sleeping.....");
//             // sleep.sleep(30);
//             // console.log("wake up.....");
//         }
//         //   // console.log(results);
//         //   // if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {
//         //   //     console.log("CANDIDATE FOR REGRESSION");
//         //   // }
//         //   // entry[2] = countVuln
//         //   // console.log(results);
//         //   // newResult.push(entry.join(","));

//         result_str += entry + "," + (currVs.length - countVuln) + "," + countVuln + "\n";
//         let details_str = "";
//         for (let k = 0; k < results.length; k++) {
//             details_str += results[k] + "\n";
//         }
//         console.log("writing details......");
//         fs.writeFileSync(detailResultFile, details_str, { flag: "a+" });
//         console.log("writing details done......");
//     } catch (e) {
//         console.log(e);
//     }
//     console.log("writing to csv......", result_str);
//     // result_str = result_str.trim();
//     fs.writeFileSync(outFile, result_str, { flag: "a+" });
//   }

function findTest(substr) {
  lst = [
    "prototype-pollution",
    "ace-breakout",
    "command-injection",
    "path-traversal",
    "redos",
  ];
  for (var folder_name in lst) {
    const TARGET_FOLDER = path.resolve(__dirname, "../../" + lst[folder_name]);
    // console.log(TARGET_FOLDER)
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
      } catch (e) {
        // console.log(e);
      }
    }
  }
  return "";
}

// let newResult = [];

// let outFile = path.resolve("./vuln-versions_" + folder_name + ".csv");
// let detailResultFile = path.resolve(
//   "./vuln-versions_" + folder_name + "_detail.txt"
// );
// let versions = JSON.parse(
//   fs.readFileSync("./all-versions_" + folder_name + ".json")
// );
// let count = 0;

// // console.log(versions);
// versions = Object.keys(versions)
//   .sort((a, b) => versions[b].length - versions[a].length)
//   .reverse()
//   .reduce((acc, key) => ((acc[key] = versions[key]), acc), {});
// // for (const key of Object.keys(versions)) {
// //     console.log(key + ":" + versions[key].length)
// // }

// let keys = [];
// for (let key in versions) {
//   keys.push(key);
// }
// let step = 1;
// let done_so_far = 0;
// // try{
// //     let currResult = fs.readFileSync(outFile).toString().split("\n");
// //     done_so_far = currResult.length;
// //     // console.log(done_so_far);
// // }catch(e){
// //     console.log(e);
// // }
// for (let index = done_so_far; index < keys.length; index += step) {
//   // let done_so_far = fs.readFileSync("./done_so_far.txt").toString();
//   console.log("done_so_far", done_so_far);
//   let result_str = "";
//   for (let i = done_so_far; i < done_so_far + step; i++) {
//     let entry = keys[i];
//     if (entry.includes("@uifabric/utilities")) continue;
//     if (entry.includes("remarkable")) continue;
//     if (entry.includes("method-override")) continue;
//     if (entry.includes("chrono-node")) continue;
//     if (entry.includes("markdown-to-jsx")) continue;
//     if (entry.includes("reduce-css-calc")) continue;
//     if (left_list.includes(entry)){
//       try {
//         // if(entry.includes("i18next"))continue;
//         currResult = versions[entry];
//         console.log(`Pkgs: ${i}/${currResult.length} ${entry}`);

//         let test = findTest(entry);
//         if (!test) {
//           console.log("Unable to find test for " + entry);
//           continue;
//         }
//         fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`);
//         let currVs = versions[entry];
//         process.chdir(TMP_FOLDER);
//         let countVuln = 0;
//         let results = [];
//         for (let j = 0; j < currVs.length; j++) {
//           let output;
//           try {
//             console.log("Installing........................", entry, currVs[j]);
//             cp.execSync(`timeout -k 10 3m npm install ${entry}@${currVs[j]}`);
//             // cp.execSync(`timeout -k 10 3m npm install sleep`);
//             console.log("Done Installing....................");
//             let res = cp.execSync(`jest --forceExit --json ./poc.test.js`);
//             // print("res====>>>",res);
//             output = JSON.parse(res.toString());
//             // console.log(output);
//             if (output.numPassedTests) {
//               results.push(entry + "-" + currVs[j] + "->" + "PASSED");
//               countVuln++;
//             } else {
//               results.push(entry + "-" + currVs[j] + "->" + "FAILED");
//             }
//           } catch (e) {
//             // console.log(e);
//             results.push(entry + "-" + currVs[j] + "->" + "FAILED");
//             // output = e.stdout.toString();
//           }
//           try {
//             cp.execSync(`npm uninstall ${entry}@${currVs[j]}`);
//           } catch (e) {}
//           // console.log("sleeping.....");
//           // sleep.sleep(30);
//           // console.log("wake up.....");
//         }
//         // console.log(results);
//         // if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {
//         //     console.log("CANDIDATE FOR REGRESSION");
//         // }
//         // entry[2] = countVuln
//         // console.log(results);
//         // newResult.push(entry.join(","));

//         result_str +=
//           entry + "," + (currVs.length - countVuln) + "," + countVuln + "\n";
//         let details_str = "";
//         for (let k = 0; k < results.length; k++) {
//           details_str += results[k] + "\n";
//         }
//         console.log("writing details......");
//         fs.writeFileSync(detailResultFile, details_str, { flag: "a+" });
//         console.log("writing details done......");
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }
//   console.log("writing to csv......", result_str);
//   // result_str = result_str.trim();
//   fs.writeFileSync(outFile, result_str, { flag: "a+" });
//   done_so_far += step;
//   // fs.writeFileSync("./done_so_far.txt", done_so_far+step,{ flag: "w"});
// }

// // let currResult = fs.readFileSync("./vuln-versions.csv").toString().split("\n");
// // let newResult = [];
// // if (!fs.existsSync(TMP_FOLDER)){
// //     fs.mkdirSync(TMP_FOLDER);
// //     fs.writeFileSync(`${TMP_FOLDER}/jest.config.json`,"{}")
// // }

// // for (let i = 0; i < currResult.length; i++) {
// //     let entry = currResult[i].split(",");
// //     console.log(`Pkgs: ${i}/${currResult.length} ${entry[0]}`);
// //     if (entry[1] == 1)
// //         entry[2] = 1;
// //     if (entry[2] == 0 && i >= 160 && i < 170) {
// //         let test = findTest(entry[0]);
// //         if (!test) {
// //             console.log("Unable to find test for " + entry[0])
// //             continue;
// //         }
// //         fs.copyFileSync(test, `${TMP_FOLDER}/poc.test.js`)
// //         let currVs = versions[entry[0]];
// //         process.chdir(TMP_FOLDER);
// //         let countVuln = 0;
// //         let results = []
// //         for (let j = 0; j < currVs.length; j++) {
// //             let output;
// //             try {
// //                 cp.execSync(`npm install ${entry[0]}@${currVs[j]}`);
// //                 let res = cp.execSync(`jest --json ./poc.test.js`);
// //                 output = JSON.parse(res.toString());
// //                 if (output.numPassedTests) {
// //                     results.push("PASSED");
// //                     countVuln++;
// //                 } else {
// //                     results.push("FAILED")
// //                 }
// //             } catch(e) {
// //                 results.push("FAILED")
// //                 // output = e.stdout.toString();
// //             }
// //         }
// //         console.log(results);
// //         if (results[results.length - 1] === "PASSED" && results.indexOf("FAILED") != -1) {
// //             console.log("CANDIDATE FOR REGRESSION");
// //         }
// //         entry[2] = countVuln
// //     }
// //     newResult.push(entry.join(","));

// // }
// // fs.writeFileSync(outFile, newResult.join("\n"));
