var Router = require("easy-router");
var http = require("http");
var maps = {
  "/public/**/*": "./**/*",
};
var router = Router({
  root: __dirname,
  maps: maps,
  useZlib: true,
  useCache: true,
  maxCacheSize: 1,
});

http
  .createServer(function (req, res) {
    router.route(req, res);
  })
  .listen(8894);
