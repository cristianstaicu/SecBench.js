console.log("Loaded babel plugin");
module.exports = function ({ types: t }) {
  return {
    visitor: {
      Function: {
        enter(path) {
          console.log("Babel Called!", path.node);
          // let name = "anon";
          // if (path.node.id)
          //   name = path.node.id.name;
          // path.node.body.body.unshift(t.callExpression(t.identifier("pushFct"), [t.stringLiteral(name + ":" + path.node.loc.start.line)]));
          // path.node.body.body.push(t.callExpression(t.identifier("popFct"), []));
        },
      },
    },
  };
};
