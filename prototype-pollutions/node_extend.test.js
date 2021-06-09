//https://hackerone.com/reports/430831
test("prototype pollution in node.extend ", () => {
    
    let extend = require('node.extend');
     var obj = {}

    expect({}.polluted).toBe(undefined);
    
    extend(true, {}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));
    expect({}.polluted).toBe("yes");
  });