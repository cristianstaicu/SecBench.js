//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28276
test("prototype pollution in deep-set", () => {
    
    var deepSet = require('deep-set')
    var obj = {'1':'2'}

    expect({}.polluted).toBe(undefined);
    

    deepSet(obj, '__proto__.polluted', 'yes')
    expect({}.polluted).toBe("yes");
  });