function getSink(stack) {
  // console.log("arguments => ", stack.length);
  let index = 0;
  for (let i = 0; i < stack.length; i++) {
    if (stack[i].includes("node_modules")) {
      index = i;
      break;
    }
  }
  let line = stack[index];
  // console.log(line)
  last_index = line.lastIndexOf("/");
  // // console.log(last_index);
  sink = line.substring(last_index + 1);
  sink = sink.replace(")", "").trim();
  console.log("sink ==>", sink);
  // console.log(stack);
}

function getCallerFile() {
  try {
    var err = new Error();
    var callerfile;
    var currentfile;

    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();
      if (currentfile !== callerfile) return callerfile;
    }
  } catch (err) {}
  return undefined;
}

function limit(a) {
  if (a.length && a.length < 50) return a;
  return "TOO_LONG";
}

const fs = require("fs");
var oldReplace = String.prototype.replace;
String.prototype.replace = function () {
  var start = process.hrtime();
  var res = oldReplace.apply(this, arguments);
  var end = process.hrtime(start);
  // console.log("end========>>>>>>>>",end);

  // var err = new Error();
  // var callerfile;
  // var currentfile;

  // Error.prepareStackTrace = function (err, stack) {
  //   return stack;
  // };
  // currentfile = err.stack.shift().getFileName();

  // fs.appendFileSync("asddsf.txt", "called!! "+(end[1] / 1000000)+" "+currentfile+"\n");
  // console.info("Execution time (hr): %ds %dms", end[0], end[1] / 1000000);
  // console.log(
  //   getCallerFile() + " exec " + limit(arguments[0]) + " " + this
  // );
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // if (True) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};

var oldMatch = String.prototype.match;
String.prototype.match = function () {
  var start = process.hrtime();
  var res = oldMatch.apply(this, arguments);
  var end = process.hrtime(start);
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // var err = new Error();
  // var callerfile;
  // var currentfile;
  // Error.prepareStackTrace = function (err, stack) {
  //   return stack;
  // };
  // currentfile = err.stack.shift().getFileName();
  var args = arguments;
  // if (true) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};

var oldSplit = String.prototype.split;
String.prototype.split = function () {
  var start = process.hrtime();
  var res = oldSplit.apply(this, arguments);
  var end = process.hrtime(start);
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // if (true) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};

var oldSearch = String.prototype.search;
String.prototype.search = function () {
  var start = process.hrtime();
  var res = oldSearch.apply(this, arguments);
  var end = process.hrtime(start);
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // if (true) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};

var oldExec = RegExp.prototype.exec;
RegExp.prototype.exec = function () {
  var start = process.hrtime();
  var res = oldExec.apply(this, arguments);
  var end = process.hrtime(start);
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // if (true) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};

var oldTest = RegExp.prototype.test;
RegExp.prototype.test = function () {
  var start = process.hrtime();
  var res = oldTest.apply(this, arguments);
  var end = process.hrtime(start);
  let time = end[0] + end[1] / 1000000000;
  // console.log("time ======>>>>",time);
  // if (true) {
  if (time >= 0.1) {
    let stack = new Error().stack.toString().split(",");
    // console.log("arg ", args)
    // console.info("Execution 5 time (hr): %ds %dms", end[0], end[1] / 1000000, stack);
    getSink(stack);
  }
  // }
  return res;
};
