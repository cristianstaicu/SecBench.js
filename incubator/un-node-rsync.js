const Rsync = require("node-rsync");

var rsync = new Rsync()
  .shell("ssh")
  .flags("az")
  .source(";/path/to/source")
  .destination("& touch aaa");

// Execute the command
rsync.execute(function (error, code, cmd) {
  console.log(cmd);
});
