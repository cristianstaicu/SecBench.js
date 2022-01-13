const Deliver = require("deliver-or-else");
const path = require("path");
// It is up to you to resolve the document root directory
const http = require("http");
let deliver = new Deliver(path.join(__dirname, "./"));
let server = http.createServer((req, res) => {});
server.listen(8000, "127.0.0.1", function () {
  console.log("Starting server...");
});
