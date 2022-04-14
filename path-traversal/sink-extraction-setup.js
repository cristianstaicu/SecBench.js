function getSink(new_arguments, stack) {
  // console.log("arguments => ", new_arguments[0], typeof new_arguments[0]);
  let package_name = "";
  let index = new_arguments[0].search("touch");
  // console.log("index ===> ", index);
  if (index != -1) {
    const regex = /[^\w-]/;
    end_index = new_arguments[0].slice(index + 6).search(regex);
    // console.log("end index ===> ", end_index);
    if (end_index == -1) {
      // console.log("package name ===> ", new_arguments[0].substring(index + 5));
      package_name = new_arguments[0].substring(index + 5).trim();
    } else {
      package_name = new_arguments[0]
        .substring(index + 6, index + 6 + end_index)
        .trim();
      // console.log(
      //   "package name ===> ", new_arguments[0].substring(index + 6, index+6+end_index)
      // );
    }
  }

  if (new_arguments[0].includes("vboxmanag-js")) {
    package_name = "vboxmanage.js";
  }

  if (new_arguments[0].includes("npm -v")) {
    package_name = "enpeem";
  }

  if (new_arguments[0].includes("jison")) {
    package_name = "jest-jasmine2";
  }

  if (new_arguments[0].includes("pdf-image")) {
    package_name = "pdf-image";
  }

  // if(new_arguments[0].includes("/var/folders/yc/kzy28h7s0wd8qmzy44zjcn640000gn/T/shelljs_f24cf05208be7db2419d")){
  //   package_name ="dns-sync";
  // }

  // if(new_arguments[0].includes("/var/folders/yc/kzy28h7s0wd8qmzy44zjcn640000gn/T/shelljs_")){
  //   package_name ="git-dummy-commit";
  // }

  // console.log("package name", package_name);
  index = 0;
  if (package_name == "") {
    for (let i = 0; i < stack.length; i++) {
      if (
        (stack[i].includes("git-dummy-commit") ||
          stack[i].includes("dns-sync")) &&
        !stack[i].includes("shelljs") &&
        !stack[i].includes(".test.js")
      ) {
        index = i;
        if (stack[i].includes("git-dummy-commit")) {
          package_name = "git-dummy-commit";
        }
        if (stack[i].includes("dns-sync")) {
          package_name = "dns-sync";
        }
        break;
      }
    }
  } else {
    for (let i = 0; i < stack.length; i++) {
      if (stack[i].includes(package_name) && !stack[i].includes(".test.js")) {
        index = i;
        break;
      }
    }
  }
  // index = 0;
  // for (let i = 0; i < stack.length; i++) {
  //   if(!stack[i].includes("Error:")){
  //     console.log(stack[i]);
  //     if ((stack[i].includes("git-dummy-commit") || stack[i].includes("dns-sync")) && !stack[i].includes("shelljs") && !stack[i].includes(".test.js")){
  //       index = i;
  //       break;
  //     }
  //     if (stack[i].includes(package_name) && !stack[i].includes(".test.js")) {
  //       index = i;
  //       break;
  //     }
  //   }
  // }
  // console.log(stack[index]);
  let line = stack[index];

  // last_index = line.lastIndexOf("/");
  // console.log("package===>> ", package_name, line);
  last_index = line.indexOf(package_name + "/");
  // console.log(last_index);
  sink = line.substring(last_index + package_name.length + 1);
  sink = sink.replace(")", "").trim();
  console.log("sink ==>", sink);
  // // extract first location from the package => output as sink
  // console.log(stack);
}

let oldExec = require("child_process").exec;
require("child_process").exec = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  // getSink(args, stack);
  // console.log("arg ====>> ", args[0], "\n\n");
  // console.log("Exce called here!")
  args[0] = args[0].replace("node ", "node ./execuator.js ");
  // console.log("arg ====>> ", args[0], "\n\n");
  return oldExec.apply(this, args);
};

let oldExecSync = require("child_process").execSync;
require("child_process").execSync = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  // getSink(args, stack);
  args[0] = args[0].replace("node ", "node ./execuator.js ");
  // console.log("ExceSync called here!")
  return oldExecSync.apply(this, args);
};

// let oldreadFileSync = require("fs").readFileSync;
// const fs = require('fs')

// require("fs").readFileSync = function () {
//   var args = arguments;
//   let stack = new Error().stack.toString().split("\n");
//   // console.log(stack)
//   console.log(args[0]);
//   console.log("\n\n\n\n\n\n")
//   // try {
//   //   fs.writeFileSync('./aaaaaaaaaaaaaaaaaaaaaaa.txt', stack)
//   //   //file written successfully
//   // } catch (err) {
//   //   console.error(err.toString().split("\n"))
//   // }
//   return oldreadFileSync.apply(this, args);
// };
