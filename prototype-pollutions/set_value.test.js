//https://snyk.io/vuln/SNYK-JS-SETVALUE-450213
test("prototype pollution in set-value ", () => {
    
    const setFn = require('set-value');
    const paths = [
      '__proto__.polluted',
    ];
    
    var obj = {}

    expect({}.polluted).toBe(undefined);
    
    setFn({}, paths[0], "yes");
    expect({}.polluted).toBe("yes");
  });