const fs = require("fs");
const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const path = require("path");
const { Literal } = require("esprima");
var culpit_list = [
  "basic-static_2.0.2/basic-static.test.js",
  "secure-servedir_0.2.7/secure-servedir.test.js",
  "glance_3.0.0/glance.test.js",
  "node-http-server_8.1.2/node-http-server.test.js",
  "stattic_0.2.3/stattic.test.js",
  "webrepl_0.4.7/webrepl.test.js",
  "rollup-plugin-serve_0.4.2/rollup-plugin-serve.test.js",
  "proxey_0.4.2/proxey.test.js",
  "hangersteak_0.2.2/hangersteak.test.js",
  "express-blinker_0.0.6/express-blinker.test.js",
  "node-simple-router_0.10.0/node-simple-router.test.js",
  "rollup-plugin-server_0.7.0/rollup-plugin-server.test.js",
  "asset-cache_0.0.6/asset-cache.test.js",
  "node-staticserver_1.0.3/node-staticserver.test.js",
  "nitro-server_1.3.3/nitro-server.test.js",
  "api-proxy_0.0.2/api-proxy.test.js",
  "isv-http_0.0.9/isv-http.test.js",
  "node-srv_2.0.0/node-srv.test.js",
  "pico-static-server_2.3.4/pico-static-server.test.js",
  "servedir_1.0.0/servedir.test.js",
  "node-static-webserver_0.0.1/node-static-webserver.test.js",
  "awning_0.1.0/awning.test.js",
  "atropa-ide_0.2.2-2/atropa-ide.test.js",
  "easy-node-server_1.2.1/easy-node-server.test.js",
  "fast-http_0.1.3/fast-http.test.js",
  "der-server_0.0.9/der-server.test.js",
  "rollup-plugin-dev-server_0.4.3/rollup-plugin-dev-server.test.js",
  "lander_1.0.0/lander.test.js",
  "wrlc_0.2.5/wrlc.test.js",
  "willvdb_test_server_0.0.0/willvdb_test_server.test.js",
];

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

function removeSleep(ast) {
  let done = false;
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (done) {
        this.break();
        return;
      }
      if (node.type === "VariableDeclaration" && !node.computed) {
        // console.log(node.expression.callee.object);
        // console.log(node.block.body[1].expression.arguments[0].value)
        if (node.declarations && node.declarations.length == 1) {
          if (node.declarations[0].init.property) {
            if (node.declarations[0].init.property.name == "execSync") {
              // console.log(node.declarations[0].init.property.name);
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
        // if (node.expression.callee) {
        //   if (node.expression.callee.object) {
        //     if (node.expression.callee.object.name) {
        //       if (node.expression.callee.object.name == "sleep") {
        //         for (let key = 0; key < parent.body.length; key++) {
        //           if (parent.body[key] === node) {
        //             // this.remove();
        //             parent.body.splice(key, 1);
        //             done = true;
        //             this.break();
        //             break;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }
    },
  });
  return ast;
}

function removeAfterAll(ast) {
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
          if (node.expression.callee.name == "afterAll") {
            // console.log(node.expression.callee.name);
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
          // console.log(node.params);
          // console.error(node.params[0].name)
          // if (node.params[0].name == "done") {
          code_to_inject = `expect.assertions(${number_of_assertion});`;
          let analysisTree = esprima.parse(code_to_inject);
          // console.log(analysisTree)
          let newNode = analysisTree.body[0];
          // console.log(newNode);
          node.body.body.unshift(newNode);
          done = true;
          this.break();
          // }
        }
      }
    },
  });
  return ast;
}

try {
  let filepath = "/Users/masudulhasanmasudbhuiyan/Music/vulns4js/ace-breakout/";
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
              file_relative_path = path.join(folder_path, file_name);
              // console.log(file_relative_path);
              // console.log(file_name);

              if (!culpit_list.includes(file_relative_path)) {
                console.log(file_relative_path);
                var data = fs
                  .readFileSync(path.join(outer_folder_path, file_name))
                  .toString();
                var ast = esprima.parse(data, { comment: true });
                // var source = ast.comments[0].value;
                var source;
                if (ast.comments.length != 0) {
                  source = ast.comments[0].value;
                }
                console.log(source);
                // ast = removeSleep(ast);
                // ast = removeAfterAll(ast);
                number_of_assertion = checkNumberOfOccurance(
                  ast,
                  "expect",
                  "Identifier"
                );
                console.log(number_of_assertion);
                ast = addAssertionStatementInPathTraversal(
                  ast,
                  number_of_assertion
                );
                var code_with_comment;
                code_to_write = escodegen.generate(ast, { comment: true });
                // console.log(code_to_write);
                if (source !== undefined) {
                  code_with_comment = "//" + source + "\n" + code_to_write;
                } else {
                  code_with_comment = code_to_write;
                }
                //     // code_with_comment = "//" + source + "\n" + code_to_write;
                console.log(code_with_comment);
                outputFile = path.join(outer_folder_path, file_name);

                fs.writeFileSync(outputFile, code_to_write, {
                  encoding: "utf-8",
                });
              }
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
