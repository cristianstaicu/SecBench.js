// console.log("Loaded babel plugin");
// module.exports = function ({ types: t }) {
//   return {
//     visitor: {
//       Function: {
//         enter(path) {
//           console.log("Babel Called!", path.node.id);
//           let name = "anon";
//           if (path.node.id)
//             name = path.node.id.name;
//           path.node.body.body.unshift(t.callExpression(t.identifier("pushFct"), [t.stringLiteral(name + ":" + path.node.loc.start.line)]));
//           path.node.body.body.push(t.callExpression(t.identifier("popFct"), []));
//         },
//       },
//     },
//   };
// };

console.log("Loaded babel plugin");
module.exports = function ({ types: t }) {
  return {
    name: "log-functions",
    visitor: {
      Function: {
        enter(path) {
          let name = "anon";
          if (path.node.id) name = path.node.id.name;
          // console.log(typeof path.node.body);
          // path.node.body.body.unshift(t.callExpression(t.identifier("pushFct"), [t.stringLiteral(name + ":" + path.node.loc.start.line)]));
          // path.node.body.body.push(t.callExpression(t.identifier("popFct"), []));

          // path.node.body.unshift(t.callExpression(t.identifier("pushFct"), [t.stringLiteral(name + ":" + path.node.loc.start.line)]));
          // path.node.body.push(t.callExpression(t.identifier("popFct"), []));
          // path.skip();
        },
      },
      ReturnStatement: {
        enter(path) {
          // process.exit(1);
          // console.log(path.parent)
          // path.replaceWith(t.logicalExpression("&&", path.node, t.callExpression(t.identifier("popFct"), [])));
          // t.callExpression(t.identifier("popFct"))
          // console.log(path.node.argument)
          let arg = path.node.argument;

          if (arg)
            path.node.argument = t.sequenceExpression([
              t.callExpression(t.identifier("popFct"), []),
              arg,
            ]);
          else
            path.node.argument = t.callExpression(t.identifier("popFct"), []);
          // console.log(path.parent.);
          // process.exit(1);
          // path.skip();
        },
      },
    },
  };
};
