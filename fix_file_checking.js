const fs = require("fs");
const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const path = require("path");
const { Literal } = require("esprima");

// function transformAndReplace(ast) {
//   let done = false;
//   estraverse.replace(ast, {
//     enter: function (node, parent) {
//       if (done) {
//         this.break();
//         return;
//       }
//       if (node.type === "ExpressionStatement" && !node.computed) {
//         if (node.expression.left) {
//           if (node.expression.left.name == "file_exist") {
//             // console.log(parent.body)
//             for (let key = 0; key < parent.body.length; key++) {
//               // console.log(key)
//               if (parent.body[key] === node) {
//                 code_to_inject = ` try {
//                                     fs.unlinkSync(path);
//                                     console.log("File removed:", path);
//                                   } catch (err) {
//                                     console.error(err);
//                                   }`;
//                 let analysisTree = esprima.parse(code_to_inject);
//                 // console.log(analysisTree)
//                 let newNode = analysisTree.body[0];
//                 // console.log(newNode)
//                 // newNode.expressions[0].right = node;
//                 // parent.body[key]= newNode;
//                 parent.body.splice(key, 0, newNode);
//                 done = true;
//                 this.break();
//                 break;
//               }
//             }
//           }
//         }
//       }
//     },
//   });
//   return ast;
// }

function transformAndReplace(ast) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type === "TryStatement" && !node.computed) {
        // console.log(node);
        // console.log(node.block.body[1].expression.arguments[0].value)
        if (
          node.block.body[1].expression.arguments[0].value == "File removed:"
        ) {
          for (let key = 0; key < parent.body.length; key++) {
            if (parent.body[key] === node) {
              code_to_inject = `try {
                                  if (fs.existsSync(path)) {
                                    fs.unlinkSync(path);
                                    console.log("File removed:", path);
                                  }
                                } catch (err) {
                                    console.error(err);
                                }`;
              let analysisTree = esprima.parse(code_to_inject);
              // console.log(analysisTree)
              let newNode = analysisTree.body[0];
              // console.log(newNode)
              // // newNode.expressions[0].right = node;
              parent.body[key] = newNode;
              // parent.body.splice(key, 0, newNode);
              done = true;
              this.break();
              break;
            }
          }
        }
      }
    },
  });
  return ast;
}

function removeSleepDecleration(ast) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type === "VariableDeclaration" && !node.computed) {
        // console.log(node.declarations[0].id);
        // console.log(node.block.body[1].expression.arguments[0].value)
        if (node.declarations.length > 0) {
          if (node.declarations[0].id.name == "sleep") {
            // console.log(node.declarations[0].id.name);
            for (let key = 0; key < parent.body.length; key++) {
              if (parent.body[key] === node) {
                // this.remove();
                parent.body.splice(key, 1);
                done = true;
                this.break();
                break;
              }
            }
          }
        }
      }
    },
  });
  return ast;
}

function removeSleep(ast) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type === "ExpressionStatement" && !node.computed) {
        // console.log(node.expression.callee.object);
        // console.log(node.block.body[1].expression.arguments[0].value)
        if (node.expression.callee) {
          if (node.expression.callee.object) {
            if (node.expression.callee.object.name) {
              if (node.expression.callee.object.name == "sleep") {
                for (let key = 0; key < parent.body.length; key++) {
                  if (parent.body[key] === node) {
                    // this.remove();
                    parent.body.splice(key, 1);
                    done = true;
                    this.break();
                    break;
                  }
                }
              }
            }
          }
        }
      }
    },
  });
  return ast;
}

function addAssertionStatement(ast, number_of_assertion) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type) {
        if (node.type == "ArrowFunctionExpression" && !node.computed) {
          // console.log(node.body.body);
          code_to_inject = `expect.assertions(${number_of_assertion});`;
          let analysisTree = esprima.parse(code_to_inject);
          // console.log(analysisTree)
          let newNode = analysisTree.body[0];
          // console.log(newNode);
          node.body.body.unshift(newNode);
          done = true;
          this.break();
        }
      }
    },
  });
  return ast;
}

function checkifalreadydone(ast) {
  let done = false;
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      // console.log("Here!")
      if (node.type == "Literal" && node.value == "File removed:") {
        // console.log("Yes!!")
        done = true;
        estraverse.VisitorOption.Break;
        return true;
      }
    },
  });
  return done;
}

function checkNumberOfOccurance(ast, str, type) {
  let count = 0;
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      // console.log("Here!")
      if (node.type == type && node.name == str) {
        count += 1;
      }
    },
  });
  // console.log("count", count)
  return count;
}
function getPortNumber(ast) {
  let count = 0;
  var ret_val;
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      // console.log(node.type);
      if (node.type == "Literal") {
        // if(node.raw)
        var node_name = node.raw;
        if (node_name.includes("'fuser")) {
          // console.log("Found!");
          ret_val = node_name;
          this.break;
        }
      }
    },
  });
  // console.log("count", count)
  return ret_val;
}

function addAssertionStatementInPathTraversal(ast, number_of_assertion) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type) {
        if (node.type == "ArrowFunctionExpression" && !node.computed) {
          // console.log(node.body.body);
          if (node.params.length == 1) {
            // console.log(node.params);
            // console.error(node.params[0].name)
            if (node.params[0].name == "done") {
              code_to_inject = `expect.assertions(${number_of_assertion});`;
              let analysisTree = esprima.parse(code_to_inject);
              // console.log(analysisTree)
              let newNode = analysisTree.body[0];
              // console.log(newNode);
              node.body.body.unshift(newNode);
              done = true;
              this.break();
            }
          }
        }
      }
    },
  });
  return ast;
}

// try {
//   // let filepath = '/Users/masudulhasanmasudbhuiyan/Music/vulns4js/command-injection/bunyan_2.0.0/bunyan.test.js';
//   let filepath =
//     "/Users/masudulhasanmasudbhuiyan/Music/vulns4js/command-injection/";
//   var files = fs.readdirSync(filepath);
//   for (const folder_path of files) {
//     // console.log(folder_path)
//     if (!folder_path.includes("node_modules")) {
//       if (fs.lstatSync(path.join(filepath, folder_path)).isDirectory()) {
//         // console.log(folder_path)
//         try {
//           var files_in_folder = fs.readdirSync(
//             path.join(filepath, folder_path)
//           );
//           // console.log(files_in_folder)
//           if (files_in_folder.length == 0) {
//             fs.rmSync(path.join(filepath, folder_path), {
//               recursive: true,
//               force: true,
//             });
//           }
//           outer_folder_path = path.join(filepath, folder_path);
//           // console.log(outer_folder_path)
//           // console.log(typeof outer_folder_path)

//           for (const file_name of files_in_folder) {
//             if (file_name.includes(".test.js")) {
//               console.log(file_name);
//               var data = fs
//                 .readFileSync(path.join(outer_folder_path, file_name))
//                 .toString();
//               var ast = esprima.parse(data, { comment: true });
//               var source = ast.comments[0].value;
//               is_done = checkifalreadydone(ast);
//               ast = transformAndReplace(ast);
//               code_to_write = escodegen.generate(ast, { comment: true });
//               // console.log(code_to_write);
//               code_with_comment = "//" + source + "\n" + code_to_write;
//               // console.log(code_with_comment);
//               outputFile = path.join(outer_folder_path, file_name);
//               // if (!is_done) {
//               // number_of_occurance = checkNumberOfOccurance(ast);
//               // if (number_of_occurance == 4) {
//               //   ast = transformAndReplace(ast);
//               //   // ast = escodegen.attachComments(ast, ast.comments);
//               //   // console.log(ast)
//               //   code_to_write = escodegen.generate(ast, { comment: true });
//               //   code_with_comment = "//" + source + "\n" + code_to_write;
//               //   console.log(code_with_comment);
//               //   outputFile = path.join(outer_folder_path, file_name);
//               fs.writeFileSync(outputFile, code_with_comment, {
//                 encoding: "utf-8",
//               });
//               // }
//               // }
//             }
//           }
//         } catch (err) {
//           console.log(err);
//         }
//         // if (folder_path.includes("aaptjs"))break;
//       }
//     }
//   }
// } catch (e) {
//   throw Error(e.message);
// }

// ast = esprima.parse('/Users/masudulhasanmasudbhuiyan/Music/vulns4js/command-injection/bunyan_2.0.0/bunyan.test.js');
// console.log(ast)

// console.log("============================");

// let node  = "" //a node reached

// let code = `console.log("123");` //code to inject
// let generated  = escodegen.generate(node);
// let code_replace = code + generated;
// let new_node = esprima.parse(code_replace).body;

// node.body[0] = new_node.body[0]
// //
// return new_node.body;
// //
// code.parent[3].child = new_node
// console.log(new_node);

// try {
//   // let filepath = '/Users/masudulhasanmasudbhuiyan/Music/vulns4js/command-injection/bunyan_2.0.0/bunyan.test.js';
//   let filepath =
//     "/Users/masudulhasanmasudbhuiyan/Music/vulns4js/command-injection/";
//   var files = fs.readdirSync(filepath);
//   for (const folder_path of files) {
//     // console.log(folder_path)
//     if (!folder_path.includes("node_modules")) {
//       if (fs.lstatSync(path.join(filepath, folder_path)).isDirectory()) {
//         // console.log(folder_path)
//         try {
//           var files_in_folder = fs.readdirSync(
//             path.join(filepath, folder_path)
//           );
//           // console.log(files_in_folder)
//           if (files_in_folder.length == 0) {
//             fs.rmSync(path.join(filepath, folder_path), {
//               recursive: true,
//               force: true,
//             });
//           }
//           outer_folder_path = path.join(filepath, folder_path);

//           for (const file_name of files_in_folder) {
//             if (file_name.includes(".test.js")) {
//               console.log(file_name);
//               var data = fs
//                 .readFileSync(path.join(outer_folder_path, file_name))
//                 .toString();
//               var ast = esprima.parse(data, { comment: true });
//               var source = ast.comments[0].value;
//               is_done = checkifalreadydone(ast);
//               // ast = transformAndReplace(ast);
//               // code_to_write = escodegen.generate(ast, { comment: true });
//               // // console.log(code_to_write);
//               // code_with_comment = "//" + source + "\n" + code_to_write;
//               // // console.log(code_with_comment);
//               // outputFile = path.join(outer_folder_path, file_name);

//               // fs.writeFileSync(outputFile, code_with_comment, {
//               //   encoding: "utf-8",
//               // });

//               // removeSleep(ast);
//               ast = removeSleep(ast);
//               number_of_assertion = checkNumberOfOccurance(
//                 ast,
//                 "expect",
//                 "Identifier"
//               );
//               ast = addAssertionStatement(ast, number_of_assertion);
//               code_to_write = escodegen.generate(ast, { comment: true });
//               // console.log(code_to_write);
//               code_with_comment = "//" + source + "\n" + code_to_write;
//               // console.log(code_with_comment);
//               outputFile = path.join(outer_folder_path, file_name);

//               fs.writeFileSync(outputFile, code_with_comment, {
//                 encoding: "utf-8",
//               });
//             }
//           }
//         } catch (err) {
//           console.log(err);
//         }
//         // if (folder_path.includes("aaptjs"))break;
//       }
//     }
//   }
// } catch (e) {
//   throw Error(e.message);
// }

function addCleaningupCode(ast, port_to_close) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type) {
        if (node.type == "Program" && !node.computed) {
          // console.log(node.body);
          code_to_inject = `var execSync = require('child_process').execSync;
                            afterAll(() => {
                              try {
                                execSync(${port_to_close});
                              } catch (e) {}
                            });`;
          let analysisTree = esprima.parse(code_to_inject);
          console.log(analysisTree);
          for (let key = analysisTree.body.length - 1; key >= 0; key--) {
            let newNode = analysisTree.body[key];
            node.body.unshift(newNode);
          }
          done = true;
          this.break();
        }
      }
    },
  });
  return ast;
}

try {
  let filepath =
    "/Users/masudulhasanmasudbhuiyan/Music/vulns4js/path-traversal/";
  var files = fs.readdirSync(filepath);
  for (const folder_path of files) {
    // console.log(folder_path)
    if (!folder_path.includes("node_modules")) {
      if (fs.lstatSync(path.join(filepath, folder_path)).isDirectory()) {
        // console.log(folder_path)
        try {
          var files_in_folder = fs.readdirSync(
            path.join(filepath, folder_path)
          );
          // console.log(files_in_folder)
          if (files_in_folder.length == 0) {
            fs.rmSync(path.join(filepath, folder_path), {
              recursive: true,
              force: true,
            });
          }
          outer_folder_path = path.join(filepath, folder_path);

          for (const file_name of files_in_folder) {
            if (file_name.includes(".test.js")) {
              console.log(file_name);
              var data = fs
                .readFileSync(path.join(outer_folder_path, file_name))
                .toString();
              var ast = esprima.parse(data, { comment: true });
              // var source = ast.comments[0].value;

              // console.log(ast);

              // console.log(getPortNumber(ast));
              // var port_to_close = getPortNumber(ast);
              // if ( port_to_close!== undefined){
              //   ast = addCleaningupCode(ast, port_to_close);
              //   code_to_write = escodegen.generate(ast, { comment: true });
              //   // console.log(code_to_write);
              //   code_with_comment = "//" + source + "\n" + code_to_write;
              //   // console.log(code_with_comment);
              //   outputFile = path.join(outer_folder_path, file_name);

              //   fs.writeFileSync(outputFile, code_with_comment, {
              //     encoding: "utf-8",
              //   });
              // }

              ast = removeSleepDecleration(ast);
              // number_of_assertion = checkNumberOfOccurance(
              //   ast,
              //   "expect",
              //   "Identifier"
              // );
              // // console.log(number_of_assertion);
              // ast = addAssertionStatementInPathTraversal(
              //   ast,
              //   number_of_assertion
              // );
              code_to_write = escodegen.generate(ast, { comment: true });
              console.log(code_to_write);
              code_with_comment = "//" + source + "\n" + code_to_write;
              console.log(code_with_comment);
              // outputFile = path.join(outer_folder_path, file_name);

              // fs.writeFileSync(outputFile, code_to_write, {
              //   encoding: "utf-8",
              // });
            }
          }
        } catch (err) {
          console.log(err);
        }
        // if (folder_path.includes("aaptjs"))break;
      }
    }
  }
} catch (e) {
  throw Error(e.message);
}
