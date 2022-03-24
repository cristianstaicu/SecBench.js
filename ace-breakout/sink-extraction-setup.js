function getSink(new_arguments, stack) {
  // console.log("arguments => ", new_arguments[0], typeof new_arguments[0]);
  let package_name = "";
  let index = new_arguments[0].search("./");
  // console.log("index ===> ", index);
  if (index != -1) {
    package_name = new_arguments[0].substring(index + 2).trim();
  }

  if (new_arguments[0].includes("thenify")) {
    package_name = "thenify";
  }
  if (new_arguments[0].includes("m-log")) {
    package_name = "m-log";
  }
  if (new_arguments[0].includes("mongoosemask")) {
    package_name = "mongoosemask";
  }

  if (new_arguments[0].includes("node-serialize")) {
    package_name = "node-serialize";
  }

  if (new_arguments[0].includes("kmc")) {
    package_name = "kmc";
  }

  if (new_arguments[0].includes("underscore")) {
    package_name = "underscore";
  }
  if (new_arguments[0].includes("node-rules")) {
    package_name = "node-rules";
  }
  if (new_arguments[0].includes("modulify")) {
    package_name = "modulify";
  }

  for (let i = 0; i < stack.length; i++) {
    if (stack[i].includes(package_name) && !stack[i].includes(".test.js")) {
      index = i;
      break;
    }
  }
  let line = stack[index];
  last_index = line.indexOf(package_name + "/");
  // // console.log(last_index);
  sink = line.substring(last_index + package_name.length + 1);
  sink = sink.replace(")", "").trim();
  if (sink.includes("<anonymous>")) {
    last_index = sink.indexOf(", <anonymous>");
    sink = sink.substring(0, last_index).trim();
  }
  console.log("sink ==>", sink);
  // console.log(stack);
}

function getSink_touch(new_arguments, stack) {
  // console.log("arguments => ", new_arguments[0], typeof new_arguments[0]);
  let package_name = "";
  let index = new_arguments[0].search("touch");
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

  if (new_arguments[0].includes("wifiscanner")) {
    package_name = "wifiscanner";
  }

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

  let line = stack[index];
  last_index = line.indexOf(package_name + "/");
  sink = line.substring(last_index + package_name.length + 1);
  sink = sink.replace(")", "").trim();
  if (sink.includes("<anonymous>")) {
    last_index = sink.indexOf(", <anonymous>");
    sink = sink.substring(0, last_index).trim();
  }
  console.log("sink ==>", sink);
  // // extract first location from the package => output as sink
  // console.log(stack);
}

let oldExec = require("child_process").exec;
require("child_process").exec = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  getSink_touch(args, stack);
  return oldExec.apply(this, arguments);
};

let oldExecSync = require("child_process").execSync;
require("child_process").execSync = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  getSink_touch(args, stack);
  return oldExecSync.apply(this, arguments);
};

let oldfs = require("fs").writeFileSync;
require("fs").writeFileSync = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  getSink(args, stack);
  return oldfs.apply(this, arguments);
};

let oldSync = require("child_process").spawnSync;
require("child_process").spawnSync = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  getSink(args, stack);
  return oldSync.apply(this, arguments);
};
var originalCookie = Object.getOwnPropertyDescriptor(
  Object.prototype,
  "polluted"
);
// console.log("original ===>> ", originalCookie);
Object.defineProperty(Object.prototype, "polluted", {
  set: function (value) {
    stack = new Error().stack.toString().split("\n");
    // console.log(stack);
    for (let i = 0; i < stack.length; i++) {
      let location = stack[i]
        .replace(/.*vulnerabilities4js/, ".")
        .replace(/\)/g, "")
        .replace("    at ", "");
      let index = stack[i].search("node_modules/");
      // console.log("index ===> ", index);
      if (index != -1) {
        l1 = location.split("node_modules/");
        if (l1.length == 3) {
          l1 = l1[2];
        } else l1 = l1[1];
        // console.log("l1==>",l1);
        l2 = l1.split(/\/(.+)/)[1].trim();
        if (l2.includes("<anonymous>")) {
          last_index = l2.indexOf(", <anonymous>");
          l2 = l2.substring(0, last_index).trim();
        }
        console.log("sink ==>", l2);
        break;
      }
    }
  },
});
