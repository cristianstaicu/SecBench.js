//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25947
test("prototype pollution in nestie", () => {
    
    const { nestie } = require("nestie")
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    nestie({"__proto__.polluted": "yes"})

    expect({}.polluted).toBe("yes");
  });
  

