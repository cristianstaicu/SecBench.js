let oldreadFileSync = require("fs").readFileSync;
let oldreadFile = require("fs").readFile;
let oldcreateReadStream = require("fs").createReadStream;
const fs = require("fs");
const output_file = "sink_locations_path_traversal.txt";

function extract_sink(stack) {
  fs.appendFileSync(output_file, stack.join("\n"));
  let index = 0;
  for (let i = 0; i < stack.length; i++) {
    if (stack[i].includes("node_modules") && !stack[i].includes(".test.js")) {
      index = i;
      break;
    }
  }

  let line = stack[index];
  var preString = "node_modules/";
  var searchString = "/";
  var preIndex = line.indexOf(preString);
  var cut_line = line.substring(preIndex);
  console.log(cut_line);
  var first_index = cut_line.indexOf("/");
  var last_index = cut_line.lastIndexOf("/");
  package_name = cut_line.substring(first_index + 1, last_index);
  console.log(package_name);
  sink = cut_line.substring(last_index + 1);
  sink = sink.replace(")", "").trim();
  // console.log(sink)
  fs.appendFileSync(output_file, "\npackage name ==> " + package_name + "\n");
  fs.appendFileSync(output_file, "\nsink ==> " + sink + "\n");
}

require("fs").readFileSync = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  // console.log(args[0]);
  try {
    // fs.writeFileSync('./aaaaaaaaaaaaaaaaaaaaaaa.txt', args.join('\n'));
    let flag = args[0];
    if (flag.includes("flag")) {
      extract_sink(stack);
    }
  } catch (err) {
    // console.error(err)
    fs.writeFileSync(output_file, err);
  }
  return oldreadFileSync.apply(this, args);
};

require("fs").readFile = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  // console.log(args[0]);
  try {
    // fs.writeFileSync('./aaaaaaaaaaaaaaaaaaaaaaa.txt', args.join('\n'));
    let flag = args[0];
    if (flag.includes("flag")) {
      extract_sink(stack);
    }
  } catch (err) {
    // console.error(err)
    fs.writeFileSync(output_file, err);
  }
  return oldreadFileSync.apply(this, args);
};

require("fs").createReadStream = function () {
  var args = arguments;
  let stack = new Error().stack.toString().split("\n");
  // console.log(args[0]);
  try {
    // fs.writeFileSync('./aaaaaaaaaaaaaaaaaaaaaaa.txt', args.join('\n'));
    let flag = args[0];
    if (flag.includes("flag")) {
      extract_sink(stack);
    }
  } catch (err) {
    // console.error(err)
    fs.writeFileSync(output_file, err);
  }
  return oldcreateReadStream.apply(this, args);
};

require(process.argv[2]);
