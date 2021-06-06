//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28273
test("prototype pollution in set-in", () => {
    
    var si = require("set-in")
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    si(obj, ['__proto__','polluted'], "yes");
    expect(obj.polluted).toBe("yes");
  });