//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28268
test("prototype pollution in controlled-merge ", () => {
    
    var merge = require('controlled-merge');
    var obj = {}

    expect({}.polluted).toBe(undefined);
    

    var obj = merge({}, JSON.parse('{ "testProperty": "hi", "prototype" : { "status" : "yes" } }'), true);    expect(obj.prototype.status).toBe("yes");
  });