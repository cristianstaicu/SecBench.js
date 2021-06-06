//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28277
test("prototype pollution in dset", () => {
    
    const dset = require('dset');
    obj = {};

    expect({}.polluted).toBe(undefined);
    

    dset(obj, '__proto__.polluted', "yes");
    expect({}.polluted).toBe("yes");
  });