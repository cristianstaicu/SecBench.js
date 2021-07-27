// problem throwing error if we reduce the 20000 to 1000

var keyPub = `ssh-rsa a${Array(20000).join(" ")}x\nx`;
var key = require("sshpk").parseKey(keyPub, "ssh");

// console.log(`ssh-rsa a${Array(10).join(' ')}x\nx`)
