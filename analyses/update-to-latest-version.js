const SOURCE_FOLDER = "/home/cris/work/vulnerabilities4js/prototype-pollution";
const TARGET_FOLDER = "/home/cris/work/playground/patches-analysis";

const fs = require("fs");

let entries = fs.readdirSync(SOURCE_FOLDER);

for (let i = 0; i < entries.length; i++) {
    let currPath = SOURCE_FOLDER + "/" + entries[i];
    let targetPath = TARGET_FOLDER + "/" + entries[i];
    try {
        fs.copyFileSync(currPath, targetPath);
        
    } catch (e){        
        // probably a folder
        let files = fs.readdirSync(currPath);
        fs.mkdirSync(targetPath);
        for (let j = 0; j < files.length; j++) {
            try {
                let content = fs.readFileSync(currPath + "/" + files[j]);
                if (files[j] === "package.json") {
                    let pkg = JSON.parse(content);
                    pkg.dependencies[Object.keys(pkg.dependencies)[0]] = "*";
                    content = JSON.stringify(pkg);
                }
                fs.writeFileSync(targetPath + "/" + files[j], content);
            } catch(e) {}
        }
    }
}